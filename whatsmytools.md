# WhatsMyTools.com — Project Blueprint

A lightweight, fast-loading, privacy-friendly **multi-tool utility website** offering device information, network tools, generators, converters, and developer helpers.  

All tools run **client-side** where possible (HTML/CSS/JS), ensuring speed and privacy.

**Primary goals:**

- High organic traffic (SEO-focused)
- Ad-based monetization
- Minimal backend complexity
- Clean, modern, fast UI

---

## 1. Core Tools (High-Traffic Targets)

These tools should be implemented first.  
Each tool gets its own dedicated page with SEO-optimized content.

### 1.1 What’s My IP

- Detect public IP (via external API if needed)
- Show IPv4 and IPv6 if available
- Optional: approximate geolocation (country/city)
- Buttons to copy IP
- Short explanation of IP addresses and privacy

**SEO Keywords:**
- what is my ip
- whats my ip address
- ip checker online
- ip lookup tool
- find my ip

---

### 1.2 What’s My Device Info

- Parse user agent string
- Show:
  - Device type (desktop / mobile / tablet)
  - Operating system + version
  - Browser + version
  - CPU architecture (where possible)
  - Hardware concurrency (logical cores)
  - Approximate memory info (if supported)
- Copy full device info as JSON/text

**SEO Keywords:**
- whats my device
- device info checker
- browser device information
- system info online
- check my device details

---

### 1.3 What’s My Screen Resolution

- Show:
  - Screen resolution (width x height)
  - Browser viewport size
  - Device pixel ratio
- Optional: classify (“Full HD”, “4K”, etc.)
- Copy resolution button

**SEO Keywords:**
- screen resolution checker
- whats my screen resolution
- detect screen size
- display resolution online
- monitor resolution test

---

### 1.4 DNS Lookup Tool

- Input: domain or hostname
- Query DNS records via an API:
  - A, AAAA, MX, CNAME, NS, TXT, SOA
- Show results in a table
- Copy records

**SEO Keywords:**
- dns lookup
- dns checker
- check dns records online
- dns record lookup tool
- domain dns lookup

---

### 1.5 WHOIS Lookup

- Input: domain name
- Query WHOIS info via API
- Show:
  - Registrar
  - Creation/expiration dates
  - Status
  - Name servers
- Optional: raw WHOIS output

**SEO Keywords:**
- whois lookup
- domain whois checker
- who owns this domain
- domain registration info
- free whois tool

---

### 1.6 Ping Test

- Input: host/domain
- Simulate ping using client-side fetch timing
- Show:
  - Average latency over multiple requests
- Display simple status (fast / medium / slow)

**SEO Keywords:**
- ping test online
- website ping checker
- latency test
- check website speed ping
- network ping tool

---

### 1.7 Port Scanner (Limited)

- Input: IP or host
- Allow user to check a small, safe set of common ports (e.g., 80, 443, 22, 21, 8080)
- Use browser-compatible techniques (WebSockets/fetch where possible)
- Visual indication of open/closed (best effort, with disclaimer)

**SEO Keywords:**
- online port scanner
- check open ports
- port check tool
- open port test
- network security scanner online

---

### 1.8 User Agent Viewer

- Show the raw user agent string
- Parse:
  - Browser
  - OS
  - Device type
- Copy UA button

**SEO Keywords:**
- user agent checker
- whats my user agent
- browser user agent string
- user agent parser online

---

### 1.9 Browser Version Checker

- Detect browser name and version
- Show if the browser is outdated (basic check)
- Suggest upgrading (generic advice)

**SEO Keywords:**
- browser version checker
- what browser am i using
- whats my browser version
- check browser info online

---

### 1.10 What’s My OS

- Detect OS from user agent and platform
- Show:
  - OS family (Windows, macOS, Linux, Android, iOS)
  - Version where possible
- Simple explanation

**SEO Keywords:**
- whats my os
- operating system checker
- check my os version
- detect os online

---

## 2. Utility Tools (Additional Traffic & Value)

### 2.1 UUID Generator

- Generate UUID v4 (random)
- Option to generate multiple at once
- Copy all results

**SEO Keywords:**
- uuid generator
- online uuid v4
- random uuid tool
- generate guid online

---

### 2.2 QR Code Generator

- Input: text/URL
- Generate QR code using client-side library (canvas/SVG)
- Download as PNG

**SEO Keywords:**
- qr code generator
- create qr code online
- free qr code tool

---

### 2.3 Password Generator

- Options:
  - Length
  - Include uppercase, lowercase, numbers, symbols
- Strength indicator
- Copy button

**SEO Keywords:**
- password generator online
- strong password generator
- random password tool
- secure password creator

---

### 2.4 Base64 Encoder / Decoder

- Encode text to Base64
- Decode Base64 to text
- Error handling

**SEO Keywords:**
- base64 encoder
- base64 decoder
- text to base64
- base64 converter online

---

### 2.5 Image Resizer (Client-Side)

- Upload image
- Set new dimensions or scale percentage
- Resize via canvas
- Download resized image
- No server upload (client-only)

**SEO Keywords:**
- image resizer online
- resize image tool
- photo resize without quality loss
- image dimensions changer

---

### 2.6 JSON Formatter / Validator

- Input JSON text
- Pretty-print with indentation
- Validate syntax with error messages

**SEO Keywords:**
- json formatter
- json validator
- pretty print json
- json beautifier online

---

### 2.7 URL Encoder / Decoder

- Encode URL components
- Decode encoded URLs
- Simple input/output fields

**SEO Keywords:**
- url encoder
- url decoder
- encode url online
- decode url tool

---

### 2.8 Text Diff Tool

- Two text areas (Left vs Right)
- Highlight differences (line-based diff)
- Mark additions/deletions

**SEO Keywords:**
- text diff tool
- compare text online
- difference checker
- online text comparer

---

### 2.9 RGB / HEX Color Converter

- Color picker + manual input
- Convert:
  - HEX → RGB
  - RGB → HEX
- Show preview swatch

**SEO Keywords:**
- rgb to hex converter
- hex color tool
- color picker online
- hex to rgb converter

---

### 2.10 Unit Converter

- Common categories:
  - Length (m, cm, in, ft)
  - Weight (kg, g, lb, oz)
  - Temperature (°C / °F)
  - Volume (L, mL, gal)
- Basic, fast, no clutter

**SEO Keywords:**
- unit converter online
- length converter
- weight converter
- temperature converter c to f

---

## 3. Directory Structure

```txt
/root
  /public
    /css
      styles.css
      dark.css (optional)
    /js
      main.js
      utils.js
    /img
      logo.svg
      favicon.ico
    index.html
  /tools
    /ip
      index.html
    /device-info
      index.html
    /screen-resolution
      index.html
    /dns-lookup
      index.html
    /whois
      index.html
    /ping
      index.html
    /port-scanner
      index.html
    /user-agent
      index.html
    /browser-version
      index.html
    /os-check
      index.html
    /uuid
      index.html
    /qr
      index.html
    /password
      index.html
    /base64
      index.html
    /image-resizer
      index.html
    /json
      index.html
    /url
      index.html
    /diff
      index.html
    /colors
      index.html
    /units
      index.html
  /seo
    sitemap.xml
    robots.txt
  README.md
  PROJECT_PLAN.md

