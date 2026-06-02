#!/usr/bin/env python3
import socket
import struct

LUXTRONIK_IP = "192.168.1.39"
LUXTRONIK_PORT = 8889

def test_luxtronik_debug():
    try:
        print(f"🔍 Verbinden met Luxtronik...")
        print(f"   IP: {LUXTRONIK_IP}:{LUXTRONIK_PORT}")
        
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(10)  # Langere timeout
        sock.connect((LUXTRONIK_IP, LUXTRONIK_PORT))
        print(f"✅ Verbinding succesvol!")
        
        # Command 3004 (get calculated values)
        command = struct.pack('>i', 3004)
        padding = struct.pack('>i', 0)
        data_to_send = command + padding
        
        print(f"\n📤 Versturen van command...")
        print(f"   Bytes: {data_to_send.hex()}")
        sock.send(data_to_send)
        
        print(f"\n📥 Wachten op response...")
        response = sock.recv(1024)  # Meer data proberen te lezen
        
        print(f"✅ Response ontvangen!")
        print(f"   Lengte: {len(response)} bytes")
        print(f"   Hex: {response.hex()}")
        print(f"   Raw: {response}")
        
        if len(response) >= 12:
            cmd, status, count = struct.unpack('>iii', response[:12])
            print(f"\n✅ Parsed data:")
            print(f"   Command: {cmd}")
            print(f"   Status: {status}")
            print(f"   Aantal parameters: {count}")
            print(f"\n🎉 Luxtronik communiceert!")
        elif len(response) > 0:
            print(f"\n⚠️ Response te kort (verwacht 12+, kreeg {len(response)} bytes)")
            print(f"   Maar er IS communicatie!")
        else:
            print("❌ Geen data ontvangen")
        
        sock.close()
        
    except socket.timeout:
        print(f"❌ Timeout na 10 seconden")
    except Exception as e:
        print(f"❌ Fout: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_luxtronik_debug()
