import RPi.GPIO as GPIO
import time
import os

FAN_PIN = 18  # GPIO pin waarop de fan zit
TEMP_THRESHOLD = 70  # graden Celsius

GPIO.setmode(GPIO.BCM)
GPIO.setup(FAN_PIN, GPIO.OUT)

try:
    while True:
        temp = int(os.popen("vcgencmd measure_temp").read().split('=')[1].split("'")[0])
        if temp > TEMP_THRESHOLD:
            GPIO.output(FAN_PIN, GPIO.HIGH)  # fan aan
        else:
            GPIO.output(FAN_PIN, GPIO.LOW)   # fan uit
        time.sleep(5)
except KeyboardInterrupt:
    GPIO.cleanup()
