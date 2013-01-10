#coding=utf-8
import pyinotify

class FileNotifier(object):
	"""docstring for FileNotifier"""
	def __init__(self):
		super(FileNotifier, self).__init__()

"""
#test code: folders newly created can not be watched.  

if __name__ == '__main__':
	watchManager = pyinotify.WatchManager()
	mask = pyinotify.IN_MODIFY | pyinotify.IN_MOVED_FROM | pyinotify.IN_MOVED_TO \
		| pyinotify.IN_CREATE | pyinotify.IN_DELETE | pyinotify.IN_UNMOUNT \
		| pyinotify.IN_Q_OVERFLOW | pyinotify.IN_DONT_FOLLOW
	watchManager.add_watch('/home/gary/kuaipan', mask, rec = True)

	fileNotifier = pyinotify.Notifier(watchManager)

	fileNotifier.loop()
"""

