# Reproduction of requestTimeout Next.js

Run locally with `npm run dev`, go to `localhost:3000`.
Throttle network speed in developer tools to 1 Mbps or lower (or Fast 3G on Firefox).

Select file larger than 50 MB (I'm using a 110 MB file for testing).
Upload will be aborted in between 5 and 5.5 minutes.
