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
  *         1.���������������
  *         1.Ϊ�˵�����¼�����
  *         2.�ļ�ͬ���������β鿴(�ٶȣ�����ͬ�����ļ�)
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
const _ = Gettext.gettext;              //�����ʲô��??            
//const Mainloop = imports.mainloop;


config = {
    "ICON_SIZE": 17  
    /*"ROOT_DIR":"kuaipan"   ~/kuaipan*/
};



//for debugging
function debug(a){                  //looking glass �е�debug�������Ὣlogֱ��д��error��ǩҳ��.
    global.log(a);
    Util.spawn(['echo',a]);         //command ,arguments.
}


/**
 * Trying to centralize code to launch files or locations using different methods.
 */
function launch() {}            //���ļ�������������࣬�ࣿ�� 

launch.prototype =
{
    file: function(file)
    {
        Gio.app_info_launch_default_for_uri(file, global.create_app_launch_context());  ///���ļ�,���д��벻���ף���
    },
    
    command: function(location)
    {
        Main.Util.spawnCommandLine(location);           //ִ������
    }
}


function MenuItem()
{
    this._init.apply(this, arguments);          //����this._init()��ʲô����???
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
        PanelMenu.SystemStatusButton.prototype._init.call(this, 'folder');       //call??    //���๹�캯�� 
        this._createMenu();

        this._updateState();            //update every 15 seconds
        event = GLib.timeout_add_seconds(0, 15, Lang.bind(this, function(){           //��ʱ��
            this._updateState();
            return true;
        }));
     },    
    
    _createMenu:function(){        
         ///////�򿪿���////////////////////////////////////
        let icon = new St.Icon({icon_name: 'user-home', icon_size: config.ICON_SIZE, icon_type: St.IconType.FULLCOLOR});
        menuitem = new MenuItem(icon,_("Open Kuaipan"));       //"�򿪿���"
        menuitem.connect('activate', function(actor, event) {
            new launch().command("nautilus kuaipan");   //open ~/kuaipan
        });
        this.menu.addMenuItem(menuitem);
         
        ///////user section.//////////////////////////////
        this._userSection = new PopupMenu.PopupSubMenuMenuItem(_("imwinston@yahoo.cn"));   //���ṩ�Ӳ˵��� menu item.
        this.menu.addMenuItem(this._userSection);
        //let icon = new St.Icon({icon_name: 'user-home', icon_size: config.ICON_SIZE, icon_type: St.IconType.FULLCOLOR});
        //1.
        icon = new St.Icon({icon_name: 'user-home', icon_size: config.ICON_SIZE, icon_type: St.IconType.FULLCOLOR});
        menuitem = new MenuItem(icon,_("Space : 5.07GB/13.29GB"));                  //"ʹ����:5.07GB/13.29GB"
        this._userSection.menu.addMenuItem(menuitem);
        //2.
        icon = new St.Icon({icon_name: 'user-home', icon_size: config.ICON_SIZE, icon_type: St.IconType.FULLCOLOR});
        menuitem = new MenuItem(icon,_("Change Account"));                      //"�л��˻�"
        this._userSection.menu.addMenuItem(menuitem);
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        /////////Util section/////////////////////////////
        //1.
        menuitem = new MenuItem(icon,_("Synchronize Now!"));                  //"��������һ��ͬ��"
        this.menu.addMenuItem(menuitem);
        //2.
        menuitem = new MenuItem(icon,_("Pause Sync.."));                            //"��ͣͬ��"
        this.menu.addMenuItem(menuitem);
        //3.
        menuitem = new MenuItem(icon,_("Preferences"));                              //"����"
        this.menu.addMenuItem(menuitem);
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
        menuitem.connect('activate', function(actor, event) {  
            new launch().command("python2.6 /home/gary/workspace/kuaipanForLinux/src/kuaipanClient.py");
        });

        /////////Help section/////////////////////////////
        this._helpSection = new PopupMenu.PopupSubMenuMenuItem(_("Help"));        //"����"  //���ṩ�Ӳ˵��� menu item.
        this.menu.addMenuItem(this._helpSection);
        //1.
        menuitem = new MenuItem(icon,_("How to Use Kuaipan?"));                      //"���ʹ�ÿ���"
        this._helpSection.menu.addMenuItem(menuitem);
        //2.
        menuitem = new MenuItem(icon,_("Open Kuaipan Website"));                      //"�򿪿�����վ"
        this._helpSection.menu.addMenuItem(menuitem);
        //3.
        menuitem = new MenuItem(icon,_("Access Kuaipan from other devices"));         //"�������豸�Ϸ��ʿ���"
        this._helpSection.menu.addMenuItem(menuitem);
        //4.
        menuitem = new MenuItem(icon,_("Contact Me.(garygaowork@gmail.com)"));        //"��ϵ����mailto:garygaowork@gmail.com"
        this._helpSection.menu.addMenuItem(menuitem);
        //5.
        menuitem = new MenuItem(icon,_("Feedbacks"));                                 //"���Ὠ��/ָ������"
        this._helpSection.menu.addMenuItem(menuitem);
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        /////////Exit section/////////////////////////////
        menuitem = new MenuItem(icon,_("Quit"));                                      //"�˳�"
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

    //let where = 'right';      //�����Ժ�����. �μ� show desktop extension.
    Main.panel.addToStatusArea('KuaipanForLinux', tray);     
}

function disable() {  
    tray.destroy();
}



/**
1.���û��enable extension ���᲻��ִ��init()??


*/
