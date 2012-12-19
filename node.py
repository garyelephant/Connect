#coding:utf-8
import logging

class Node(object):
	"""docstring for Node"""
	def __init__(self, arg):
		super(Node, self).__init__()
		self.arg = arg
		
class File(Node):
	"""docstring for File"""
	def __init__(self, arg):
		super(File, self).__init__()
		self.arg = arg
		
class Directory(object):
	"""docstring for Directory"""
	def __init__(self, arg):
		super(Directory, self).__init__()
		self.arg = arg
