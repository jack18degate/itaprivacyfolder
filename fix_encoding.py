import os

path = os.path.join('src', 'layouts', 'Layout.astro')

with open(path, 'rb') as f:
    raw = f.read()

# Remove BOM if present
if raw[:3] == b'\xef\xbb\xbf':
    raw = raw[3:]

text = raw.decode('utf-8')

# Fix double \r\r\n -> \r\n
while '\r\r\n' in text:
    text = text.replace('\r\r\n', '\r\n')

# Fix double-encoded UTF-8 sequences:
# em-dash: original \xe2\x80\x94 was double encoded
# In the broken file, this appears as the 3 chars: â (U+00E2) + € (U+20AC) + " (U+201C)
text = text.replace('\u00e2\u20ac\u201c', '\u2014')  # â€" -> — (em dash)  
text = text.replace('\u00e2\u20ac\u201d', '\u2014')  # â€" variant -> —
text = text.replace('\u00e2\u20ac\u0094', '\u2014')  # another em dash variant

# Box drawing: ═ (U+2550), original \xe2\x95\x90
text = text.replace('\u00e2\u0095\u0090', '\u2550')

# Italian accented chars that may still be broken
text = text.replace('\u00c3\u00a0', '\u00e0')  # à
text = text.replace('\u00c3\u00a8', '\u00e8')  # è  
text = text.replace('\u00c3\u00a9', '\u00e9')  # é
text = text.replace('\u00c3\u00ac', '\u00ec')  # ì
text = text.replace('\u00c3\u00b2', '\u00f2')  # ò
text = text.replace('\u00c3\u00b9', '\u00f9')  # ù

with open(path, 'w', encoding='utf-8', newline='\r\n') as f:
    f.write(text)

# Verify
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Line 29: {lines[28].strip()[:60]}")
print(f"Line 77: {lines[76].strip()[:80]}")
print(f"Line 80: {lines[79].strip()[:60]}")
print(f"Line 115: {lines[114].strip()[:60]}")
print(f"Total lines: {len(lines)}")
print("Done!")
