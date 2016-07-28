from pyrml import Module

m = Module("Echo", "A simple echo module")

@m.command("echo")
def echo(msg, args):
    m.say(msg["Params"][0], " ".join(args))

m.register()