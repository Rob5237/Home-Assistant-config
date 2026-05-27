#!/usr/bin/env python3
"""Schrijft de TDI (legionella) klokprogramma tijden naar de Luxtronik via socket."""
import socket
import struct
import sys

LUXTRONIK_IP = "192.168.1.39"
LUXTRONIK_PORT = 8889

# Params: Ma-Vr start/eind, Za start/eind, Zo start/eind
TDI_PARAMS = [265, 266, 271, 272, 277, 278]


def write_param(param_index: int, value: int) -> int:
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(10)
    sock.connect((LUXTRONIK_IP, LUXTRONIK_PORT))
    sock.sendall(struct.pack(">iii", 3002, param_index, value))
    sock.recv(4)  # command echo
    confirmed = struct.unpack(">i", sock.recv(4))[0]
    sock.close()
    return confirmed


def read_param(param_index: int) -> int:
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(10)
    sock.connect((LUXTRONIK_IP, LUXTRONIK_PORT))
    sock.send(struct.pack(">i", 3003) + struct.pack(">i", 0))
    sock.recv(4)
    count = struct.unpack(">i", sock.recv(4))[0]
    data = b""
    needed = count * 4
    while len(data) < needed:
        chunk = sock.recv(needed - len(data))
        if not chunk:
            break
        data += chunk
    sock.close()
    return struct.unpack(">i", data[param_index * 4: param_index * 4 + 4])[0]


def set_tdi_times(start_sec: int, end_sec: int):
    labels = ["Ma-Vr start", "Ma-Vr eind", "Za start", "Za eind", "Zo start", "Zo eind"]
    for i, param in enumerate(TDI_PARAMS):
        value = start_sec if i % 2 == 0 else end_sec
        confirmed = write_param(param, value)
        verified = read_param(param)
        status = "OK" if verified == value else f"FOUT (got {verified}s = {verified//3600}:{(verified%3600)//60:02d})"
        print(f"  param {param} ({labels[i]}): {value//3600}:{(value%3600)//60:02d} -> bevestigd: {confirmed} | {status}")


if __name__ == "__main__":
    # Argumenten: start_uur start_min eind_uur eind_min
    if len(sys.argv) != 5:
        print("Gebruik: tdi_klokprogramma.py <start_uur> <start_min> <eind_uur> <eind_min>")
        sys.exit(1)

    start_sec = int(sys.argv[1]) * 3600 + int(sys.argv[2]) * 60
    end_sec = int(sys.argv[3]) * 3600 + int(sys.argv[4]) * 60
    print(f"TDI instellen: {sys.argv[1]}:{sys.argv[2]} - {sys.argv[3]}:{sys.argv[4]}")
    set_tdi_times(start_sec, end_sec)
    print("Klaar.")
