# -*- coding: utf-8 -*-
p = 'js/app.js'
t = open(p, encoding='utf-8', newline='').read()
S = 'this.getRestaurantSources'
reps = [
    ("rating: src.naver?.rating || (ov + 0.15).toFixed(2),", "rating: src.naver?.rating ?? '-',"),
    ("reviewCount: src.naver?.reviewCount || r.reviewCount || 3500,", "reviewCount: src.naver?.reviewCount ?? 0,"),
    ("rating: src.kakao?.rating || (ov - 0.45).toFixed(1),", "rating: src.kakao?.rating ?? '-',"),
    ("reviewCount: src.kakao?.reviewCount || Math.round((r.reviewCount || 1000) * 0.08),", "reviewCount: src.kakao?.reviewCount ?? 0,"),
    ("rating: src.google?.rating || (ov - 0.1).toFixed(1),", "rating: src.google?.rating ?? '-',"),
    ("reviewCount: src.google?.reviewCount || Math.round((r.reviewCount || 1000) * 0.25),", "reviewCount: src.google?.reviewCount ?? 0,"),
]
for k in ('naver', 'kakao', 'google'):
    reps.append((f"{S}(b).{k}.rating - {S}(a).{k}.rating",
                 f"(Number({S}(b).{k}.rating) || 0) - (Number({S}(a).{k}.rating) || 0)"))
for a, b in reps:
    print(t.count(a), a[:55])
    t = t.replace(a, b)
open(p, 'w', encoding='utf-8', newline='').write(t)
