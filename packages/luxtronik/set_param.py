#!/usr/bin/env python3
"""Schrijft een enkele parameter naar de Luxtronik via socket."""
import socket
import struct
import sys

LUXTRONIK_IP = "192.168.1.39"
LUXTRONIK_PORT = 8889


def write_param(param_index: int, value: int) -> int:
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(10)
    sock.connect((LUXTRONIK_IP, LUXTRONIK_PORT))
    sock.sendall(struct.pack(">iii", 3002, param_index, value))
    sock.recv(4)
    confirmed = struct.unpack(">i", sock.recv(4))[0]
    sock.close()
    return confirmed


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Gebruik: set_param.py <param_index> <waarde>")
        sys.exit(1)

    param_index = int(sys.argv[1])
    value = int(sys.argv[2])
    confirmed = write_param(param_index, value)
    print(f"Param {param_index} ingesteld op {value}, bevestigd: {confirmed}")
