import pyrml
import sys

m = pyrml.Module("Echo", "A simple echo module")

@m.command("echo")
def echo(msg, args):
    m.say(msg["Params"][0], " ".join(args))

m.register(sys.argv)