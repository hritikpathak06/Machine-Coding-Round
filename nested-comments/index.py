import cv2
import mediapipe as mp
import numpy as np
from ctypes import cast, POINTER
from comtypes import CLSCTX_ALL
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1, min_detection_confidence=0.5)
mp_draw = mp.solutions.drawing_utils

# Initialize camera
cap = cv2.VideoCapture(0)

# Initialize audio controller
devices = AudioUtilities.GetSpeakers()
interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
volume = cast(interface, POINTER(IAudioEndpointVolume))
volume_range = volume.GetVolumeRange()

while True:
    success, img = cap.read()
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
   
    # Process hand landmarks
    results = hands.process(img_rgb)
   
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            # Get thumb and index finger landmarks
            thumb = hand_landmarks.landmark[4]
            index = hand_landmarks.landmark[8]
           
            # Calculate positions for drawing
            h, w, c = img.shape
            thumb_x, thumb_y = int(thumb.x * w), int(thumb.y * h)
            index_x, index_y = int(index.x * w), int(index.y * h)
            
            # # Draw Circles for finger_hands
        
           
            # Draw circles at thumb and index finger positions
            cv2.circle(img, (thumb_x, thumb_y), 15, (255, 0, 255), cv2.FILLED)
            cv2.circle(img, (index_x, index_y), 15, (255, 0, 255), cv2.FILLED)
           
            # Draw line between thumb and index finger
            cv2.line(img, (thumb_x, thumb_y), (index_x, index_y), (255, 0, 255), 3)
           
            # Calculate distance between thumb and index finger
            distance = np.sqrt((thumb.x - index.x)**2 + (thumb.y - index.y)**2)
           
            # Map distance to volume range
            vol = np.interp(distance, [0.02, 0.2], [volume_range[0], volume_range[1]])
           
            # Set system volume
            volume.SetMasterVolumeLevel(vol, None)
           
            # Display volume bar
            cv2.rectangle(img, (50, 150), (85, 400), (0, 255, 0), 3)
            cv2.rectangle(img, (50, int(400 - (400-150) * (vol-volume_range[0])/(volume_range[1]-volume_range[0]))),
                          (85, 400), (0, 255, 0), cv2.FILLED)
           
    cv2.imshow("Volume Controller", img)
   
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()