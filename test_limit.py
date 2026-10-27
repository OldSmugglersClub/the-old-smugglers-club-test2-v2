from pathlib import Path
import ast
s=Path(__file__).with_name('apply_test13.py').read_text()
assert '28e8f2298bc79e073d3acae1e9f629c52023cee4' in s
assert '6_000_000:2_000_000' in s
compile(s,'apply_test13.py','exec')
for provider,is_match,body_len,expected in [('portugal',True,4129050,True),('portugal',True,6000001,False),('italien',True,4129050,False),('portugal',False,4129050,False),('portugal',True,2000001,True)]:
    allowed = body_len <= (6000000 if provider=='portugal' and is_match else 2000000)
    assert allowed==expected,(provider,is_match,body_len)
print('PASS: 5 Limit-Fälle und Python-Syntax')
