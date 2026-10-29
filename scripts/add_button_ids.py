# -*- coding: utf-8 -*-
with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

target1 = '''              <button
                type="button"
                onclick="app.submitNewPost(event)"
                class="px-5 py-1.5 rounded-lg bg-[#03C75A]'''

repl1 = '''              <button
                type="button"
                id="btn-post-submit-top"
                onclick="app.submitNewPost(event)"
                class="px-5 py-1.5 rounded-lg bg-[#03C75A]'''

target2 = '''                <button
                  type="button"
                  onclick="app.submitNewPost(event)"
                  class="px-6 py-2.5 rounded-lg bg-[#03C75A]'''

repl2 = '''                <button
                  type="button"
                  id="btn-post-submit-bottom"
                  onclick="app.submitNewPost(event)"
                  class="px-6 py-2.5 rounded-lg bg-[#03C75A]'''

text = text.replace(target1, repl1)
text = text.replace(target2, repl2)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated submit button IDs in index.html!')
