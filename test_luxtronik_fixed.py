#!/usr/bin/env python3
import socket
import struct

LUXTRONIK_IP = "192.168.1.39"
LUXTRONIK_PORT = 8889

def test_luxtronik_fixed():
    try:
        print(f"🔍 Verbinden met Luxtronik...")
        print(f"   IP: {LUXTRONIK_IP}:{LUXTRONIK_PORT}")
        
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(10)
        sock.connect((LUXTRONIK_IP, LUXTRONIK_PORT))
        print(f"✅ Verbinding succesvol!")
        
        # Command 3004 (get calculated values)
        command = struct.pack('>i', 3004)
        padding = struct.pack('>i', 0)
        sock.send(command + padding)
        
        print(f"\n📥 Lezen van response (meerdere delen)...")
        
        # Deel 1: Command echo (4 bytes)
        response1 = sock.recv(4)
        cmd_echo = struct.unpack('>i', response1)[0]
        print(f"   Part 1 (command echo): {cmd_echo}")
        
        # Deel 2: Status (4 bytes)
        response2 = sock.recv(4)
        status = struct.unpack('>i', response2)[0]
        print(f"   Part 2 (status): {status}")
        
        # Deel 3: Count (4 bytes)
        response3 = sock.recv(4)
        count = struct.unpack('>i', response3)[0]
        print(f"   Part 3 (parameter count): {count}")
        
        print(f"\n✅ Complete response ontvangen!")
        print(f"   Command: {cmd_echo}")
        print(f"   Status: {status}")
        print(f"   Aantal parameters: {count}")
        
        # Lees eerste paar parameters als test
        print(f"\n📊 Eerste 5 parameters:")
        for i in range(min(5, count)):
            param_data = sock.recv(4)
            if len(param_data) == 4:
                param_value = struct.unpack('>i', param_data)[0]
                print(f"   Parameter {i}: {param_value} (raw: {param_value/10:.1f} als temp)")
        
        print(f"\n🎉 Luxtronik werkt PERFECT!")
        print(f"   Je hebt {count} parameters beschikbaar!")
        print(f"\n✅ Ga door naar integratie installatie!")
        
        sock.close()
        
    except Exception as e:
        print(f"❌ Fout: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_luxtronik_fixed()
