class Config(object):
	"""docstring for Config"""
	def __init__(self):
		super(Config, self).__init__()
		# TODO init: get user info from cloud.

	def setRootDir(self, rootDir):
		self.rootDir = rootDir

	def rootDir(self):
		return self.rootDir

	def setUserId(self, id):
		self.userId = id

	def userId(self):
		return self.userId

	def setUserName(self, userName):
		self.userName = userName

	def userName(self):
		return self.userName

	def setPassword(self, password):
		self.password = password

	def password(self):
		return self.password

	def totalSpace(self):
		return self.totalSpace

	def usedSpace(self):
		return self.usedSpace

	def recycleSpace(self):
		return self.recycleSpace

	def maxFileSize(self):
		return self.maxFileSize
	
	def setSyncState(self, state):
		self.syncState = state

	def syncState(self):
		return self.syncState

	def ignore(self):
		# set & get which folder or what type(in regex) of file to be ignored. 
		pass
