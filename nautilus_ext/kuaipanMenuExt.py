# coding=utf-8
"""
tips:
    put this file into ～/.local/share/nautilus-python/extension
"""
from os.path import join,abspath,isfile                 #abspath是多余的
from gi.repository import Nautilus,GObject

class menuExt(GObject.GObject,Nautilus.MenuProvider):
    def __init__(self):
        self.kuaipanDir = "/home/gary/kuaipan"          #TODO应该从配置文件中读取此参数
    
    
    def inside(self,filePath):      
        return filePath.startswith(self.kuaipanDir)

   

    #当在选中的文件上点击右键时出现下面菜单
    def get_file_items(self,window,files):  
        """
        args:
                files: a list of Nautilus.FileInfo,未选中文件时,len(files) = 0 
        """
        top_menuitem = None   
        
        if len(files) != 0 and self.inside(files[0].get_uri()[7:]):
            top_menuitem = Nautilus.MenuItem(name = 'Kuaipan::KuaipanMenu1', \
                                                label = '快盘',  \
                                                tip = '',        \
                                                icon = '')
            submenu = Nautilus.Menu()
            top_menuitem.set_submenu(submenu)

            #sub_menutime 1 立即同步            
            sub_menuitem = Nautilus.MenuItem(name='Kuaipan::Sync',  \
                                                label = '立即同步',     \
                                                tip = '',               \
                                                icon = '')
            submenu.append_item(sub_menuitem)
            sub_menuitem.connect('activate', self.menu_cb_sync_file, files[0])       #事件与处理函数绑定 

            #sub_menutime 2 分享
            sub_menuitem = Nautilus.MenuItem(name='Kuaipan::Share',  \
                                                label = '分享',     \
                                                tip = '',               \
                                                icon = '')
            submenu.append_item(sub_menuitem)
            sub_menuitem.connect('activate', self.menu_cb_share, files[0])       #事件与处理函数绑定 

            #sub_menutime 3 生成下载链接
            sub_menuitem = Nautilus.MenuItem(name='Kuaipan::Link',  \
                                                label = '生成下载链接',     \
                                                tip = '',               \
                                                icon = '')
            submenu.append_item(sub_menuitem)
            sub_menuitem.connect('activate', self.menu_cb_generate_link, files[0])       #事件与处理函数绑定 

            #sub_menutime 4 查看修改历史
            sub_menuitem = Nautilus.MenuItem(name='Kuaipan::FileHistory',  \
                                                label = '查看修改历史',     \
                                                tip = '',               \
                                                icon = '')
            submenu.append_item(sub_menuitem)
            sub_menuitem.connect('activate', self.menu_cb_show_history, files[0])       #事件与处理函数绑定 

        return top_menuitem,

    #menu activate callback
    def menu_cb_sync_file(self, menu, file): 
        #print "menu_cb_sync",file.get_name()
        pass    

    #menu activate callback
    def menu_cb_share(self, menu, file): 
        #print "menu_cb_share",file.get_name()
        pass

    #menu activate callback
    def menu_cb_generate_link(self, menu, file): 
        #print "menu_cb_generate_link",file.get_name()
        pass

    #menu activate callback
    def menu_cb_show_history(self, menu, file): 
        #print "menu_cb_show_history",file.get_name()
        pass

    
    #下面添加的菜单会出现在菜单栏File的菜单中,和在空白处点右键出现的菜单中。
    def get_background_items(self,window,file):
        
        
        top_menuitem = Nautilus.MenuItem(name='Kuaipan::KuaipanMenu2',      \
                                        label = '快盘全局菜单',        \
                                        tip = '',                   \
                                        icon = '')
        submenu = Nautilus.Menu()
        top_menuitem.set_submenu(submenu)

        #sub menuitem 1  快盘账户名
        self.make_sub_menuitem(_name = 'Kuaipan::Account',                   \
                                    _label = '这里显示快盘的账户名',          \
                                    _tip = '',                               \
                                    _icon = '',                              \
                                    _parent_menu = submenu,                  \
                                    _signal = None,                          \
                                    _callback = None)

        #sub menuitem 2 快盘使用情况(只显示，可能没有事件对应的函数)
        self.make_sub_menuitem(_name = 'Kuaipan::StorageStatics',            \
                                    _label = '这里显示快盘的使用率',          \
                                    _tip = '',                               \
                                    _icon = '',                              \
                                    _parent_menu = submenu,                  \
                                    _signal = None,                          \
                                    _callback = None)

        #sub menuitem 3 进行一次同步
        self.make_sub_menuitem(_name = 'Kuaipan::SyncAll',                   \
                                    _label = '进行一次同步',                  \
                                    _tip = '',                               \
                                    _icon = '',                              \
                                    _parent_menu = submenu,                  \
                                    _signal = 'activate',                    \
                                    _callback = self.menu_cb_sync_all)

        #sub menuitem 4 设置 
        self.make_sub_menuitem(_name = 'Kuaipan::Configure',                 \
                                    _label = '设置',                         \
                                    _tip = '',                               \
                                    _icon = '',                              \
                                    _parent_menu = submenu,                  \
                                    _signal = 'activate',                    \
                                    _callback = self.menu_cb_configure)    

        #sub menuitem 5 在其他设备上使用快盘
        self.make_sub_menuitem(_name = 'Kuaipan::OnOtherDevices',            \
                                    _label = '在其他设备上使用快盘',          \
                                    _tip = '',                               \
                                    _icon = '',                              \
                                    _parent_menu = submenu,                  \
                                    _signal = 'activate',                    \
                                    _callback = self.menu_cb_use_other_devices)

        #sub menuitem 6 签到(暂不可用)
        self.make_sub_menuitem(_name = 'Kuaipan::Signiture',                 \
                                    _label = '签到(暂不可用)',                \
                                    _tip = '',                               \
                                    _icon = '',                              \
                                    _parent_menu = submenu,                  \
                                    _signal = None,                          \
                                    _callback = None)
        #sub menuitem 7 数据备份助手(暂不可用)
        self.make_sub_menuitem(_name = 'Kuaipan::Assistant',                 \
                                    _label = '数据备份助手(暂不可用)',        \
                                    _tip = '',                               \
                                    _icon = '',                              \
                                    _parent_menu = submenu,                  \
                                    _signal = None,                          \
                                    _callback = None)

        return top_menuitem,

 #添加子菜单项的共用方法
    def make_sub_menuitem(self,_name,_label,_tip,_icon,_parent_menu,_signal = None,_callback = None):
        menuitem = Nautilus.MenuItem(name = _name,label = _label,tip = _tip,icon = _icon)
        _parent_menu.append_item(menuitem)
        if _callback != None:
            menuitem.connect(_signal, _callback)       #事件与处理函数绑定 
    
    def menu_cb_sync_all(self,menu):
        pass    
       
    def menu_cb_configure(self,menu):
        pass    

    def menu_cb_use_other_devices(self,menu):
        pass    

