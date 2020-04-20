/**
 * 解析URI路径
 * 
 * 参考来源：https://tools.ietf.org/html/rfc3986#section-3.1
 */
const REG_FOR_URI = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?/gi
const URI_RESULT = REG_FOR_URI.exec('http://www.ics.uci.edu/pub/ietf/uri/#Related')

const uriObj = {
  scheme: URI_RESULT[2],
  authority: URI_RESULT[4],
  path: URI_RESULT[5],
  query: URI_RESULT[7],
  fragment: URI_RESULT[9]
}

export default uriObj


/**
 * URI
  - scheme
  > scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )

  - authority
  authority = [ userinfo "@" ] host [ ":" port ]
    - userinfo
    > userinfo = *( unreserved / pct-encoded / sub-delims / ":" )
    - host
    > host = IP-literal / IPv4address / reg-name
      IP-literal = "[" ( IPv6address / IPvFuture  ) "]"
      IPvFuture  = "v" 1*HEXDIG "." 1*( unreserved / sub-delims / ":" )
      IPv6address   =                            6( h16 ":" ) ls32
                /                       "::" 5( h16 ":" ) ls32
                / [               h16 ] "::" 4( h16 ":" ) ls32
                / [ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
                / [ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
                / [ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
                / [ *4( h16 ":" ) h16 ] "::"              ls32
                / [ *5( h16 ":" ) h16 ] "::"              h16
                / [ *6( h16 ":" ) h16 ] "::"
      h16           = 1*4HEXDIG
      ls32          = ( h16 ":" h16 ) / IPv4address
      IPv4address   = dec-octet "." dec-octet "." dec-octet "." dec-octet
      dec-octet     = DIGIT                 ; 0-9
                / %x31-39 DIGIT         ; 10-99
                / "1" 2DIGIT            ; 100-199
                / "2" %x30-34 DIGIT     ; 200-249
                / "25" %x30-35          ; 250-255
    - port
    > port = *DIGIT

  - path
  > path          = path-abempty    ; begins with "/" or is empty
                / path-absolute   ; begins with "/" but not "//"
                / path-noscheme   ; begins with a non-colon segment
                / path-rootless   ; begins with a segment
                / path-empty      ; zero characters
    path-abempty  = *( "/" segment )
    path-absolute = "/" [ segment-nz *( "/" segment ) ]
    path-noscheme = segment-nz-nc *( "/" segment )
    path-rootless = segment-nz *( "/" segment )
    path-empty    = 0<pchar>
    segment       = *pchar
    segment-nz    = 1*pchar
    segment-nz-nc = 1*( unreserved / pct-encoded / sub-delims / "@" )
                  ; non-zero-length segment without any colon ":"
  - query
  > query == *( pchar / "/" / "?" )

  - fragment
  > fragment = *( pchar / "/" / "?" )

  unreserved  = ALPHA / DIGIT / "-" / "." / "_" / "~"
  pct-encoded = "%" HEXDIG HEXDIG
  sub-delims = "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "="
  HEXDIG = 16进制数字
 */