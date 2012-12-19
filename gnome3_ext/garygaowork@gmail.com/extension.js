/**
 * Kuaipan Tray extension for Gnome Shell 3.X.
 * 
 * 
 * 
 * @author Gary <garygaowork@gmail.com>
 * @version 0.0.1
 * @notes:some javascript come from one-in-place gnome extension.
 */

/**
  *TODO:
  *         1.解决中文乱码问题
  *         1.为菜单添加事件处理
  *         2.文件同步情况，如何查看(速度，正在同步的文件)
  *
  *
  *
  */
const St = imports.gi.St;
const Lang = imports.lang;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Main = imports.ui.main;
const GLib = imports.gi.GLib;
const Util = imports.misc.util;
const Gettext = imports.gettext;
const _ = Gettext.gettext;              //这个有什么用??            
//const Mainloop = imports.mainloop;


config = {
    "ICON_SIZE": 17  
    /*"ROOT_DIR":"kuaipan"   ~/kuaipan*/
};



//for debugging
function debug(a){                  //looking glass 中的debug方法，会将log直接写到error标签页中.
    global.log(a);
    Util.spawn(['echo',a]);         //command ,arguments.
}


/**
 * Trying to centralize code to launch files or locations using different methods.
 */
function launch() {}            //打开文件或启动程序的类，类？？ 

launch.prototype =
{
    file: function(file)
    {
        Gio.app_info_launch_default_for_uri(file, global.create_app_launch_context());  ///打开文件,这行代码不明白？？
    },
    
    command: function(location)
    {
        Main.Util.spawnCommandLine(location);           //执行命令
    }
}


function MenuItem()
{
    this._init.apply(this, arguments);          //这与this._init()有什么区别???
}

MenuItem.prototype =
{
    __proto__: PopupMenu.PopupBaseMenuItem.prototype,
    
    _init: function(icon, text, params)
    {
        PopupMenu.PopupBaseMenuItem.prototype._init.call(this, params);
            
        this.label = new St.Label({ text: text });
        this.addActor(this.label);        
        this.addActor(icon);        
    }
};


function KuaipanTray(orientation) {     //orientation
    this._init(orientation);           //apply??
}

KuaipanTray.prototype = {
    __proto__: PanelMenu.SystemStatusButton.prototype,
 
    _init: function(){
        PanelMenu.SystemStatusButton.prototype._init.call(this, 'folder');       //call??    //父类构造函数 
        this._createMenu();

        this._updateState();            //update every 15 seconds
        event = GLib.timeout_add_seconds(0, 15, Lang.bind(this, function(){           //定时器
            this._updateState();
            return true;
        }));
     },    
    
    _createMenu:function(){        
         ///////打开快盘////////////////////////////////////
        let icon = new St.Icon({icon_name: 'user-home', icon_size: config.ICON_SIZE, icon_type: St.IconType.FULLCOLOR});
        menuitem = new MenuItem(icon,_("Open Kuaipan"));       //"打开快盘"
        menuitem.connect('activate', function(actor, event) {
            new launch().command("nautilus kuaipan");   //open ~/kuaipan
        });
        this.menu.addMenuItem(menuitem);
         
        ///////user section.//////////////////////////////
        this._userSection = new PopupMenu.PopupSubMenuMenuItem(_("imwinston@yahoo.cn"));   //可提供子菜单的 menu item.
        this.menu.addMenuItem(this._userSection);
        //let icon = new St.Icon({icon_name: 'user-home', icon_size: config.ICON_SIZE, icon_type: St.IconType.FULLCOLOR});
        //1.
        icon = new St.Icon({icon_name: 'user-home', icon_size: config.ICON_SIZE, icon_type: St.IconType.FULLCOLOR});
        menuitem = new MenuItem(icon,_("Space : 5.07GB/13.29GB"));                  //"使用率:5.07GB/13.29GB"
        this._userSection.menu.addMenuItem(menuitem);
        //2.
        icon = new St.Icon({icon_name: 'user-home', icon_size: config.ICON_SIZE, icon_type: St.IconType.FULLCOLOR});
        menuitem = new MenuItem(icon,_("Change Account"));                      //"切换账户"
        this._userSection.menu.addMenuItem(menuitem);
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        /////////Util section/////////////////////////////
        //1.
        menuitem = new MenuItem(icon,_("Synchronize Now!"));                  //"立即进行一次同步"
        this.menu.addMenuItem(menuitem);
        //2.
        menuitem = new MenuItem(icon,_("Pause Sync.."));                            //"暂停同步"
        this.menu.addMenuItem(menuitem);
        //3.
        menuitem = new MenuItem(icon,_("Preferences"));                              //"设置"
        this.menu.addMenuItem(menuitem);
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
        menuitem.connect('activate', function(actor, event) {  
            new launch().command("python2.6 /home/gary/workspace/kuaipanForLinux/src/kuaipanClient.py");
        });

        /////////Help section/////////////////////////////
        this._helpSection = new PopupMenu.PopupSubMenuMenuItem(_("Help"));        //"帮助"  //可提供子菜单的 menu item.
        this.menu.addMenuItem(this._helpSection);
        //1.
        menuitem = new MenuItem(icon,_("How to Use Kuaipan?"));                      //"如何使用快盘"
        this._helpSection.menu.addMenuItem(menuitem);
        //2.
        menuitem = new MenuItem(icon,_("Open Kuaipan Website"));                      //"打开快盘网站"
        this._helpSection.menu.addMenuItem(menuitem);
        //3.
        menuitem = new MenuItem(icon,_("Access Kuaipan from other devices"));         //"从其他设备上访问快盘"
        this._helpSection.menu.addMenuItem(menuitem);
        //4.
        menuitem = new MenuItem(icon,_("Contact Me.(garygaowork@gmail.com)"));        //"联系作者mailto:garygaowork@gmail.com"
        this._helpSection.menu.addMenuItem(menuitem);
        //5.
        menuitem = new MenuItem(icon,_("Feedbacks"));                                 //"请提建议/指出问题"
        this._helpSection.menu.addMenuItem(menuitem);
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        /////////Exit section/////////////////////////////
        menuitem = new MenuItem(icon,_("Quit"));                                      //"退出"
        this.menu.addMenuItem(menuitem);
    },

    _updateState:function(){       //get state from state.json.

    
    },

    _funcName:function(){


    }
};

let tray

function init() {
    //do nothing
}

function enable() {	   
    tray = new KuaipanTray();

    //let where = 'right';      //留做以后配置. 参见 show desktop extension.
    Main.panel.addToStatusArea('KuaipanForLinux', tray);     
}

function disable() {  
    tray.destroy();
}



/**
1.如果没有enable extension ，会不会执行init()??


*/
