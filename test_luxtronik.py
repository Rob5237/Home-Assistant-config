#!/usr/bin/env python3
import socket
import struct

LUXTRONIK_IP = "192.168.1.39"
LUXTRONIK_PORT = 8889

def test_luxtronik():
    try:
        print(f"🔍 Verbinden met Luxtronik...")
        print(f"   IP: {LUXTRONIK_IP}:{LUXTRONIK_PORT}")
      
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(5)
        sock.connect((LUXTRONIK_IP, LUXTRONIK_PORT))
        print(f"✅ Verbinding succesvol!")
      
        # Command 3004 (get calculated values)
        command = struct.pack('>i', 3004)
        padding = struct.pack('>i', 0)
        sock.send(command + padding)
      
        response = sock.recv(12)
        if len(response) >= 12:
            cmd, status, count = struct.unpack('>iii', response)
            print(f"✅ Data ontvangen!")
            print(f"   Command: {cmd}")
            print(f"   Status: {status}")
            print(f"   Aantal parameters: {count}")
            print(f"\n🎉 Luxtronik werkt! Ga door naar volgende stap.")
        else:
            print("❌ Onvoldoende data ontvangen")
      
        sock.close()
      
    except Exception as e:
        print(f"❌ Fout: {e}")

if __name__ == "__main__":
    test_luxtronik()
