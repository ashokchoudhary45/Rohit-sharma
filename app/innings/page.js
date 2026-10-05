"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* =========================================================
   ROHIT SHARMA — ALL INNINGS EXPLORER
   Standalone page
   No dependency on ../site-chrome
========================================================= */

const display = {
  className: "font-black tracking-[-0.04em] uppercase",
};

/* ---------- LOCAL PAGE CHROME ---------- */

function Navigation({ active = "" }) {
  const links = [
    ["Home", "/"],
    ["Profile", "/profile"],
    ["Career", "/career"],
    ["Records", "/records"],
    ["Stats", "/stats"],
    ["Captaincy", "/captaincy"],
    ["World Cups", "/world-cups"],
    ["News", "/news"],
    ["Gallery", "/gallery"],
    ["Innings", "/innings"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a
          href="/"
          className="text-xl font-black tracking-[-0.04em] text-white"
        >
          ROHIT<span className="text-blue-500">45</span>
        </a>

        <nav className="hidden items-center gap-5 md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={`text-[11px] font-black uppercase tracking-[0.1em] transition ${
                active === label
                  ? "text-blue-400"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="/profile"
          className="rounded-full border border-white/15 px-4 py-2 text-xs font-black uppercase tracking-wider text-white transition hover:border-blue-400 hover:bg-blue-500/10"
        >
          45
        </a>
      </div>
    </header>
  );
}

function Page({ active = "", children }) {
  return (
    <main className="min-h-screen overflow-x-clip bg-black text-white selection:bg-blue-500 selection:text-white">
      <Navigation active={active} />
      {children}
    </main>
  );
}

/* ---------- EMBEDDED BATTING DATA (no JSON file needed) ----------
   One row per innings, sorted newest first. Columns:
   [date, format, opposition, ground, tournament, testInnings, runs,
    notOut(1/0), balls, fours, sixes, strikeRate]
   Test rows without ball data have balls = null.
   Source: Cricbuzz match list (batting part 1). Bowling comes later. */
const BAT_COLS = [
  "date", "format", "opp", "ground", "tournament",
  "inn", "runs", "notOut", "balls", "fours", "sixes", "sr",
];

const BAT_ROWS = [["2026-10-03","ODI","WI","New Chandigarh","WEST INDIES TOUR OF INDIA, 2026",null,92,0,85,10,3,108.2],["2026-09-30","ODI","WI","Guwahati","WEST INDIES TOUR OF INDIA, 2026",null,101,0,75,10,6,134.6],["2026-09-27","ODI","WI","Thiruvananthapuram","WEST INDIES TOUR OF INDIA, 2026",null,32,0,35,2,3,91.4],["2026-07-19","ODI","ENG","London","INDIA TOUR OF ENGLAND, 2026",null,138,0,110,17,5,125.4],["2026-07-16","ODI","ENG","Cardiff","INDIA TOUR OF ENGLAND, 2026",null,26,0,47,1,1,55.3],["2026-07-14","ODI","ENG","Birmingham","INDIA TOUR OF ENGLAND, 2026",null,11,0,21,1,0,52.3],["2026-06-20","ODI","AFG","Chennai","AFGHANISTAN TOUR OF INDIA 2026",null,79,0,69,9,3,114.4],["2026-06-17","ODI","AFG","Lucknow","AFGHANISTAN TOUR OF INDIA 2026",null,48,0,39,6,2,123],["2026-06-13","ODI","AFG","Dharamsala","AFGHANISTAN TOUR OF INDIA 2026",null,16,0,16,2,1,100],["2026-05-24","IPL","RR","Mumbai","INDIAN PREMIER LEAGUE 2026",null,0,0,4,0,0,0],["2026-05-20","IPL","KKR","Kolkata","INDIAN PREMIER LEAGUE 2026",null,15,0,13,0,2,115.3],["2026-05-14","IPL","PBKS","Dharamsala","INDIAN PREMIER LEAGUE 2026",null,25,0,26,0,2,96.1],["2026-05-10","IPL","RCB","Raipur","INDIAN PREMIER LEAGUE 2026",null,22,0,10,2,2,220],["2026-05-04","IPL","LSG","Mumbai","INDIAN PREMIER LEAGUE 2026",null,84,0,44,6,7,190.9],["2026-04-12","IPL","RCB","Mumbai","INDIAN PREMIER LEAGUE 2026",null,19,0,13,2,1,146.1],["2026-04-07","IPL","RR","Guwahati","INDIAN PREMIER LEAGUE 2026",null,5,0,6,0,0,83.3],["2026-04-04","IPL","DC","Delhi","INDIAN PREMIER LEAGUE 2026",null,35,0,26,5,1,134.6],["2026-03-29","IPL","KKR","Mumbai","INDIAN PREMIER LEAGUE 2026",null,78,0,38,6,6,205.2],["2026-01-18","ODI","NZ","Indore","NEW ZEALAND TOUR OF INDIA, 2026",null,11,0,13,2,0,84.6],["2026-01-14","ODI","NZ","Rajkot","NEW ZEALAND TOUR OF INDIA, 2026",null,24,0,38,4,0,63.1],["2026-01-11","ODI","NZ","Vadodara","NEW ZEALAND TOUR OF INDIA, 2026",null,26,0,29,3,2,89.6],["2025-12-06","ODI","RSA","Visakhapatnam","SOUTH AFRICA TOUR OF INDIA, 2025",null,75,0,73,7,3,102.7],["2025-12-03","ODI","RSA","Raipur","SOUTH AFRICA TOUR OF INDIA, 2025",null,14,0,8,3,0,175],["2025-11-30","ODI","RSA","Ranchi","SOUTH AFRICA TOUR OF INDIA, 2025",null,57,0,51,5,3,111.7],["2025-10-25","ODI","AUS","Sydney","INDIA TOUR OF AUSTRALIA, 2025",null,121,1,125,13,3,96.8],["2025-10-23","ODI","AUS","Adelaide","INDIA TOUR OF AUSTRALIA, 2025",null,73,0,97,7,2,75.2],["2025-10-19","ODI","AUS","Perth","INDIA TOUR OF AUSTRALIA, 2025",null,8,0,14,1,0,57.1],["2025-06-01","IPL","PBKS","Ahmedabad","INDIAN PREMIER LEAGUE 2025",null,8,0,7,1,0,114.2],["2025-05-30","IPL","GT","New Chandigarh","INDIAN PREMIER LEAGUE 2025",null,81,0,50,9,4,162],["2025-05-26","IPL","PBKS","Jaipur","INDIAN PREMIER LEAGUE 2025",null,24,0,21,2,1,114.2],["2025-05-21","IPL","DC","Mumbai","INDIAN PREMIER LEAGUE 2025",null,5,0,5,1,0,100],["2025-05-06","IPL","GT","Mumbai","INDIAN PREMIER LEAGUE 2025",null,7,0,8,1,0,87.5],["2025-05-01","IPL","RR","Jaipur","INDIAN PREMIER LEAGUE 2025",null,53,0,36,9,0,147.2],["2025-04-27","IPL","LSG","Mumbai","INDIAN PREMIER LEAGUE 2025",null,12,0,5,0,2,240],["2025-04-23","IPL","SRH","Hyderabad","INDIAN PREMIER LEAGUE 2025",null,70,0,46,8,3,152.1],["2025-04-20","IPL","CSK","Mumbai","INDIAN PREMIER LEAGUE 2025",null,76,1,45,4,6,168.8],["2025-04-17","IPL","SRH","Mumbai","INDIAN PREMIER LEAGUE 2025",null,26,0,16,0,3,162.5],["2025-04-13","IPL","DC","Delhi","INDIAN PREMIER LEAGUE 2025",null,18,0,12,2,1,150],["2025-04-07","IPL","RCB","Mumbai","INDIAN PREMIER LEAGUE 2025",null,17,0,9,2,1,188.8],["2025-04-02","IPL","KKR","Mumbai","INDIAN PREMIER LEAGUE 2025",null,13,0,12,0,1,108.3],["2025-03-29","IPL","GT","Ahmedabad","INDIAN PREMIER LEAGUE 2025",null,8,0,4,2,0,200],["2025-03-23","IPL","CSK","Chennai","INDIAN PREMIER LEAGUE 2025",null,0,0,4,0,0,0],["2025-03-09","ODI","NZ","Dubai","ICC CHAMPIONS TROPHY, 2025",null,76,0,83,7,3,91.5],["2025-03-04","ODI","AUS","Dubai","ICC CHAMPIONS TROPHY, 2025",null,28,0,29,3,1,96.5],["2025-03-02","ODI","NZ","Dubai","ICC CHAMPIONS TROPHY, 2025",null,15,0,17,1,1,88.2],["2025-02-23","ODI","PAK","Dubai","ICC CHAMPIONS TROPHY, 2025",null,20,0,15,3,1,133.3],["2025-02-20","ODI","BAN","Dubai","ICC CHAMPIONS TROPHY, 2025",null,41,0,36,7,0,113.8],["2025-02-12","ODI","ENG","Ahmedabad","ENGLAND TOUR OF INDIA, 2025",null,1,0,2,0,0,50],["2025-02-09","ODI","ENG","Cuttack","ENGLAND TOUR OF INDIA, 2025",null,119,0,90,12,7,132.2],["2025-02-06","ODI","ENG","Nagpur","ENGLAND TOUR OF INDIA, 2025",null,2,0,7,0,0,28.5],["2024-12-26","Test","AUS","Melbourne","INDIA TOUR OF AUSTRALIA, 2024-25",1,3,0,null,null,null,null],["2024-12-26","Test","AUS","Melbourne","INDIA TOUR OF AUSTRALIA, 2024-25",2,9,0,null,null,null,null],["2024-12-14","Test","AUS","Brisbane","INDIA TOUR OF AUSTRALIA, 2024-25",1,10,0,null,null,null,null],["2024-12-06","Test","AUS","Adelaide","INDIA TOUR OF AUSTRALIA, 2024-25",1,3,0,null,null,null,null],["2024-12-06","Test","AUS","Adelaide","INDIA TOUR OF AUSTRALIA, 2024-25",2,6,0,null,null,null,null],["2024-11-01","Test","NZ","Mumbai","NEW ZEALAND TOUR OF INDIA, 2024",1,18,0,null,null,null,null],["2024-11-01","Test","NZ","Mumbai","NEW ZEALAND TOUR OF INDIA, 2024",2,11,0,null,null,null,null],["2024-10-24","Test","NZ","Pune","NEW ZEALAND TOUR OF INDIA, 2024",1,0,0,null,null,null,null],["2024-10-24","Test","NZ","Pune","NEW ZEALAND TOUR OF INDIA, 2024",2,8,0,null,null,null,null],["2024-10-16","Test","NZ","Bengaluru","NEW ZEALAND TOUR OF INDIA, 2024",1,2,0,null,null,null,null],["2024-10-16","Test","NZ","Bengaluru","NEW ZEALAND TOUR OF INDIA, 2024",2,52,0,null,null,null,null],["2024-09-27","Test","BAN","Kanpur","BANGLADESH TOUR OF INDIA, 2024",1,23,0,null,null,null,null],["2024-09-27","Test","BAN","Kanpur","BANGLADESH TOUR OF INDIA, 2024",2,8,0,null,null,null,null],["2024-09-19","Test","BAN","Chennai","BANGLADESH TOUR OF INDIA, 2024",1,6,0,null,null,null,null],["2024-09-19","Test","BAN","Chennai","BANGLADESH TOUR OF INDIA, 2024",2,5,0,null,null,null,null],["2024-08-07","ODI","SL","Colombo","INDIA TOUR OF SRI LANKA, 2024",null,35,0,20,6,1,175],["2024-08-04","ODI","SL","Colombo","INDIA TOUR OF SRI LANKA, 2024",null,64,0,44,5,4,145.4],["2024-08-02","ODI","SL","Colombo","INDIA TOUR OF SRI LANKA, 2024",null,58,0,47,7,3,123.4],["2024-06-29","T20I","RSA","Bridgetown, Barbados","ICC MEN'S T20 WORLD CUP 2024",null,9,0,5,2,0,180],["2024-06-27","T20I","ENG","Guyana","ICC MEN'S T20 WORLD CUP 2024",null,57,0,39,6,2,146.1],["2024-06-24","T20I","AUS","Gros Islet, St Lucia","ICC MEN'S T20 WORLD CUP 2024",null,92,0,41,7,8,224.3],["2024-06-22","T20I","BAN","North Sound, Antigua","ICC MEN'S T20 WORLD CUP 2024",null,23,0,11,3,1,209],["2024-06-20","T20I","AFG","Bridgetown, Barbados","ICC MEN'S T20 WORLD CUP 2024",null,8,0,13,1,0,61.5],["2024-06-12","T20I","USA","New York","ICC MEN'S T20 WORLD CUP 2024",null,3,0,6,0,0,50],["2024-06-09","T20I","PAK","New York","ICC MEN'S T20 WORLD CUP 2024",null,13,0,12,1,1,108.3],["2024-06-05","T20I","IRE","New York","ICC MEN'S T20 WORLD CUP 2024",null,52,0,37,4,3,140.5],["2024-05-17","IPL","LSG","Mumbai","INDIAN PREMIER LEAGUE 2024",null,68,0,38,10,3,178.9],["2024-05-11","IPL","KKR","Kolkata","INDIAN PREMIER LEAGUE 2024",null,19,0,24,1,1,79.1],["2024-05-06","IPL","SRH","Mumbai","INDIAN PREMIER LEAGUE 2024",null,4,0,5,1,0,80],["2024-05-03","IPL","KKR","Mumbai","INDIAN PREMIER LEAGUE 2024",null,11,0,12,0,1,91.6],["2024-04-30","IPL","LSG","Lucknow","INDIAN PREMIER LEAGUE 2024",null,4,0,5,1,0,80],["2024-04-27","IPL","DC","Delhi","INDIAN PREMIER LEAGUE 2024",null,8,0,8,1,0,100],["2024-04-22","IPL","RR","Jaipur","INDIAN PREMIER LEAGUE 2024",null,6,0,5,1,0,120],["2024-04-18","IPL","PBKS","New Chandigarh","INDIAN PREMIER LEAGUE 2024",null,36,0,25,2,3,144],["2024-04-14","IPL","CSK","Mumbai","INDIAN PREMIER LEAGUE 2024",null,105,1,63,11,5,166.6],["2024-04-11","IPL","RCB","Mumbai","INDIAN PREMIER LEAGUE 2024",null,38,0,24,3,3,158.3],["2024-04-07","IPL","DC","Mumbai","INDIAN PREMIER LEAGUE 2024",null,49,0,27,6,3,181.4],["2024-04-01","IPL","RR","Mumbai","INDIAN PREMIER LEAGUE 2024",null,0,0,1,0,0,0],["2024-03-27","IPL","SRH","Hyderabad","INDIAN PREMIER LEAGUE 2024",null,26,0,12,1,3,216.6],["2024-03-24","IPL","GT","Ahmedabad","INDIAN PREMIER LEAGUE 2024",null,43,0,29,7,1,148.2],["2024-03-07","Test","ENG","Dharamsala","ENGLAND TOUR OF INDIA, 2024",1,103,0,null,null,null,null],["2024-02-23","Test","ENG","Ranchi","ENGLAND TOUR OF INDIA, 2024",1,2,0,null,null,null,null],["2024-02-23","Test","ENG","Ranchi","ENGLAND TOUR OF INDIA, 2024",2,55,0,null,null,null,null],["2024-02-15","Test","ENG","Rajkot","ENGLAND TOUR OF INDIA, 2024",1,131,0,null,null,null,null],["2024-02-15","Test","ENG","Rajkot","ENGLAND TOUR OF INDIA, 2024",2,19,0,null,null,null,null],["2024-02-02","Test","ENG","Visakhapatnam","ENGLAND TOUR OF INDIA, 2024",1,14,0,null,null,null,null],["2024-02-02","Test","ENG","Visakhapatnam","ENGLAND TOUR OF INDIA, 2024",2,13,0,null,null,null,null],["2024-01-25","Test","ENG","Hyderabad","ENGLAND TOUR OF INDIA, 2024",1,24,0,null,null,null,null],["2024-01-25","Test","ENG","Hyderabad","ENGLAND TOUR OF INDIA, 2024",2,39,0,null,null,null,null],["2024-01-17","T20I","AFG","Bengaluru","AFGHANISTAN TOUR OF INDIA, 2024",null,121,1,69,11,8,175.3],["2024-01-14","T20I","AFG","Indore","AFGHANISTAN TOUR OF INDIA, 2024",null,0,0,1,0,0,0],["2024-01-11","T20I","AFG","Mohali","AFGHANISTAN TOUR OF INDIA, 2024",null,0,0,2,0,0,0],["2024-01-03","Test","RSA","Cape Town","INDIA TOUR OF SOUTH AFRICA, 2023-24",1,39,0,null,null,null,null],["2024-01-03","Test","RSA","Cape Town","INDIA TOUR OF SOUTH AFRICA, 2023-24",2,16,1,null,null,null,null],["2023-12-26","Test","RSA","Centurion","INDIA TOUR OF SOUTH AFRICA, 2023-24",1,5,0,null,null,null,null],["2023-12-26","Test","RSA","Centurion","INDIA TOUR OF SOUTH AFRICA, 2023-24",2,0,0,null,null,null,null],["2023-11-19","ODI","AUS","Ahmedabad","ICC CRICKET WORLD CUP 2023",null,47,0,31,4,3,151.6],["2023-11-15","ODI","NZ","Mumbai","ICC CRICKET WORLD CUP 2023",null,47,0,29,4,4,162],["2023-11-12","ODI","NED","Bengaluru","ICC CRICKET WORLD CUP 2023",null,61,0,54,8,2,112.9],["2023-11-05","ODI","RSA","Kolkata","ICC CRICKET WORLD CUP 2023",null,40,0,24,6,2,166.6],["2023-11-02","ODI","SL","Mumbai","ICC CRICKET WORLD CUP 2023",null,4,0,2,1,0,200],["2023-10-29","ODI","ENG","Lucknow","ICC CRICKET WORLD CUP 2023",null,87,0,101,10,3,86.1],["2023-10-22","ODI","NZ","Dharamsala","ICC CRICKET WORLD CUP 2023",null,46,0,40,4,4,115],["2023-10-19","ODI","BAN","Pune","ICC CRICKET WORLD CUP 2023",null,48,0,40,7,2,120],["2023-10-14","ODI","PAK","Ahmedabad","ICC CRICKET WORLD CUP 2023",null,86,0,63,6,6,136.5],["2023-10-11","ODI","AFG","Delhi","ICC CRICKET WORLD CUP 2023",null,131,0,84,16,5,155.9],["2023-10-08","ODI","AUS","Chennai","ICC CRICKET WORLD CUP 2023",null,0,0,6,0,0,0],["2023-09-27","ODI","AUS","Rajkot","AUSTRALIA TOUR OF INDIA, 2023",null,81,0,57,5,6,142.1],["2023-09-15","ODI","BAN","Colombo","ASIA CUP, 2023",null,0,0,2,0,0,0],["2023-09-12","ODI","SL","Colombo","ASIA CUP, 2023",null,53,0,48,7,2,110.4],["2023-09-10","ODI","PAK","Colombo","ASIA CUP, 2023",null,56,0,49,6,4,114.2],["2023-09-04","ODI","NEP","Pallekele","ASIA CUP, 2023",null,74,1,59,6,5,125.4],["2023-09-02","ODI","PAK","Pallekele","ASIA CUP, 2023",null,11,0,22,2,0,50],["2023-07-27","ODI","WI","Bridgetown, Barbados","INDIA TOUR OF WEST INDIES, 2023",null,12,1,19,2,0,63.1],["2023-07-20","Test","WI","Port of Spain, Trinidad","INDIA TOUR OF WEST INDIES, 2023",1,80,0,null,null,null,null],["2023-07-20","Test","WI","Port of Spain, Trinidad","INDIA TOUR OF WEST INDIES, 2023",2,57,0,null,null,null,null],["2023-07-12","Test","WI","Roseau, Dominica","INDIA TOUR OF WEST INDIES, 2023",1,103,0,null,null,null,null],["2023-06-07","Test","AUS","London","ICC WORLD TEST CHAMPIONSHIP FINAL 2023",1,15,0,null,null,null,null],["2023-06-07","Test","AUS","London","ICC WORLD TEST CHAMPIONSHIP FINAL 2023",2,43,0,null,null,null,null],["2023-05-26","IPL","GT","Ahmedabad","INDIAN PREMIER LEAGUE 2023",null,8,0,7,1,0,114.2],["2023-05-24","IPL","LSG","Chennai","INDIAN PREMIER LEAGUE 2023",null,11,0,10,1,1,110],["2023-05-21","IPL","SRH","Mumbai","INDIAN PREMIER LEAGUE 2023",null,56,0,37,8,1,151.3],["2023-05-16","IPL","LSG","Lucknow","INDIAN PREMIER LEAGUE 2023",null,37,0,25,1,3,148],["2023-05-12","IPL","GT","Mumbai","INDIAN PREMIER LEAGUE 2023",null,29,0,18,3,2,161.1],["2023-05-09","IPL","RCB","Mumbai","INDIAN PREMIER LEAGUE 2023",null,7,0,8,1,0,87.5],["2023-05-06","IPL","CSK","Chennai","INDIAN PREMIER LEAGUE 2023",null,0,0,3,0,0,0],["2023-05-03","IPL","PBKS","Mohali","INDIAN PREMIER LEAGUE 2023",null,0,0,3,0,0,0],["2023-04-30","IPL","RR","Mumbai","INDIAN PREMIER LEAGUE 2023",null,3,0,5,0,0,60],["2023-04-25","IPL","GT","Ahmedabad","INDIAN PREMIER LEAGUE 2023",null,2,0,8,0,0,25],["2023-04-22","IPL","PBKS","Mumbai","INDIAN PREMIER LEAGUE 2023",null,44,0,27,4,3,162.9],["2023-04-18","IPL","SRH","Hyderabad","INDIAN PREMIER LEAGUE 2023",null,28,0,18,6,0,155.5],["2023-04-16","IPL","KKR","Mumbai","INDIAN PREMIER LEAGUE 2023",null,20,0,13,1,2,153.8],["2023-04-11","IPL","DC","Delhi","INDIAN PREMIER LEAGUE 2023",null,65,0,45,6,4,144.4],["2023-04-08","IPL","CSK","Mumbai","INDIAN PREMIER LEAGUE 2023",null,21,0,13,3,1,161.5],["2023-04-02","IPL","RCB","Bengaluru","INDIAN PREMIER LEAGUE 2023",null,1,0,10,0,0,10],["2023-03-22","ODI","AUS","Chennai","AUSTRALIA TOUR OF INDIA, 2023",null,30,0,17,2,2,176.4],["2023-03-19","ODI","AUS","Visakhapatnam","AUSTRALIA TOUR OF INDIA, 2023",null,13,0,15,2,0,86.6],["2023-03-09","Test","AUS","Ahmedabad","AUSTRALIA TOUR OF INDIA, 2023",1,35,0,null,3,1,60.3],["2023-03-01","Test","AUS","Indore","AUSTRALIA TOUR OF INDIA, 2023",1,12,0,null,3,0,52.1],["2023-03-01","Test","AUS","Indore","AUSTRALIA TOUR OF INDIA, 2023",2,12,0,null,0,0,36.3],["2023-02-17","Test","AUS","Delhi","AUSTRALIA TOUR OF INDIA, 2023",1,32,0,null,2,0,46.3],["2023-02-17","Test","AUS","Delhi","AUSTRALIA TOUR OF INDIA, 2023",2,31,0,null,3,2,155],["2023-02-09","Test","AUS","Nagpur","AUSTRALIA TOUR OF INDIA, 2023",1,120,0,null,15,2,56.6],["2023-01-24","ODI","NZ","Indore","NEW ZEALAND TOUR OF INDIA, 2023",null,101,0,85,9,6,118.8],["2023-01-21","ODI","NZ","Raipur","NEW ZEALAND TOUR OF INDIA, 2023",null,51,0,50,7,2,102],["2023-01-18","ODI","NZ","Hyderabad","NEW ZEALAND TOUR OF INDIA, 2023",null,34,0,38,4,2,89.4],["2023-01-15","ODI","SL","Thiruvananthapuram","SRI LANKA TOUR OF INDIA, 2023",null,42,0,49,2,3,85.7],["2023-01-12","ODI","SL","Kolkata","SRI LANKA TOUR OF INDIA, 2023",null,17,0,21,2,1,80.9],["2023-01-10","ODI","SL","Guwahati","SRI LANKA TOUR OF INDIA, 2023",null,83,0,67,9,3,123.8],["2022-12-07","ODI","BAN","Dhaka","INDIA TOUR OF BANGLADESH, 2022",null,51,1,28,3,5,182.1],["2022-12-04","ODI","BAN","Dhaka","INDIA TOUR OF BANGLADESH, 2022",null,27,0,31,4,1,87.1],["2022-11-10","T20I","ENG","Adelaide","ICC MENS T20 WORLD CUP 2022",null,27,0,28,4,0,96.4],["2022-11-06","T20I","ZIM","Melbourne","ICC MENS T20 WORLD CUP 2022",null,15,0,13,2,0,115.3],["2022-11-02","T20I","BAN","Adelaide","ICC MENS T20 WORLD CUP 2022",null,2,0,8,0,0,25],["2022-10-30","T20I","RSA","Perth","ICC MENS T20 WORLD CUP 2022",null,15,0,14,1,1,107.1],["2022-10-27","T20I","NED","Sydney","ICC MENS T20 WORLD CUP 2022",null,53,0,39,4,3,135.9],["2022-10-23","T20I","PAK","Melbourne","ICC MENS T20 WORLD CUP 2022",null,4,0,7,0,0,57.1],["2022-10-04","T20I","RSA","Indore","SOUTH AFRICA TOUR OF INDIA, 2022",null,0,0,2,0,0,0],["2022-10-02","T20I","RSA","Guwahati","SOUTH AFRICA TOUR OF INDIA, 2022",null,43,0,37,7,1,116.2],["2022-09-28","T20I","RSA","Thiruvananthapuram","SOUTH AFRICA TOUR OF INDIA, 2022",null,0,0,2,0,0,0],["2022-09-25","T20I","AUS","Hyderabad","AUSTRALIA TOUR OF INDIA, 2022",null,17,0,14,2,1,121.4],["2022-09-23","T20I","AUS","Nagpur","AUSTRALIA TOUR OF INDIA, 2022",null,46,1,20,4,4,230],["2022-09-20","T20I","AUS","Mohali","AUSTRALIA TOUR OF INDIA, 2022",null,11,0,9,1,1,122.2],["2022-09-06","T20I","SL","Dubai","ASIA CUP, 2022",null,72,0,41,5,4,175.6],["2022-09-04","T20I","PAK","Dubai","ASIA CUP, 2022",null,28,0,16,3,2,175],["2022-08-31","T20I","HKC","Dubai","ASIA CUP, 2022",null,21,0,13,2,1,161.5],["2022-08-28","T20I","PAK","Dubai","ASIA CUP, 2022",null,12,0,18,0,1,66.6],["2022-08-06","T20I","WI","Lauderhill, Florida","INDIA TOUR OF WEST INDIES, 2022",null,33,0,16,2,3,206.2],["2022-08-02","T20I","WI","Basseterre, St Kitts","INDIA TOUR OF WEST INDIES, 2022",null,11,0,5,1,1,220],["2022-08-01","T20I","WI","Basseterre, St Kitts","INDIA TOUR OF WEST INDIES, 2022",null,0,0,1,0,0,0],["2022-07-29","T20I","WI","Tarouba, Trinidad","INDIA TOUR OF WEST INDIES, 2022",null,64,0,44,7,2,145.4],["2022-07-17","ODI","ENG","Manchester","INDIA TOUR OF ENGLAND, 2022",null,17,0,17,4,0,100],["2022-07-14","ODI","ENG","London","INDIA TOUR OF ENGLAND, 2022",null,0,0,10,0,0,0],["2022-07-12","ODI","ENG","London","INDIA TOUR OF ENGLAND, 2022",null,76,1,58,6,5,131],["2022-07-10","T20I","ENG","Nottingham","INDIA TOUR OF ENGLAND, 2022",null,11,0,12,2,0,91.6],["2022-07-09","T20I","ENG","Birmingham","INDIA TOUR OF ENGLAND, 2022",null,31,0,20,3,2,155],["2022-07-07","T20I","ENG","Southampton","INDIA TOUR OF ENGLAND, 2022",null,24,0,14,5,0,171.4],["2022-05-21","IPL","DC","Mumbai","INDIAN PREMIER LEAGUE 2022",null,2,0,13,0,0,15.3],["2022-05-17","IPL","SRH","Mumbai","INDIAN PREMIER LEAGUE 2022",null,48,0,36,2,4,133.3],["2022-05-12","IPL","CSK","Mumbai","INDIAN PREMIER LEAGUE 2022",null,18,0,14,4,0,128.5],["2022-05-09","IPL","KKR","Navi Mumbai","INDIAN PREMIER LEAGUE 2022",null,2,0,6,0,0,33.3],["2022-05-06","IPL","GT","Mumbai","INDIAN PREMIER LEAGUE 2022",null,43,0,28,5,2,153.5],["2022-04-30","IPL","RR","Navi Mumbai","INDIAN PREMIER LEAGUE 2022",null,2,0,5,0,0,40],["2022-04-24","IPL","LSG","Mumbai","INDIAN PREMIER LEAGUE 2022",null,39,0,31,5,1,125.8],["2022-04-21","IPL","CSK","Navi Mumbai","INDIAN PREMIER LEAGUE 2022",null,0,0,2,0,0,0],["2022-04-16","IPL","LSG","Mumbai","INDIAN PREMIER LEAGUE 2022",null,6,0,7,1,0,85.7],["2022-04-13","IPL","PBKS","Pune","INDIAN PREMIER LEAGUE 2022",null,28,0,17,3,2,164.7],["2022-04-09","IPL","RCB","Pune","INDIAN PREMIER LEAGUE 2022",null,26,0,15,4,1,173.3],["2022-04-06","IPL","KKR","Pune","INDIAN PREMIER LEAGUE 2022",null,3,0,12,0,0,25],["2022-04-02","IPL","RR","Navi Mumbai","INDIAN PREMIER LEAGUE 2022",null,10,0,5,0,1,200],["2022-03-27","IPL","DC","Mumbai","INDIAN PREMIER LEAGUE 2022",null,41,0,32,4,2,128.1],["2022-03-12","Test","SL","Bengaluru","SRI LANKA TOUR OF INDIA, 2022",1,15,0,null,1,1,60],["2022-03-12","Test","SL","Bengaluru","SRI LANKA TOUR OF INDIA, 2022",2,46,0,null,4,0,58.2],["2022-03-04","Test","SL","Mohali","SRI LANKA TOUR OF INDIA, 2022",1,29,0,null,6,0,103.5],["2022-02-27","T20I","SL","Dharamsala","SRI LANKA TOUR OF INDIA, 2022",null,5,0,9,1,0,55.5],["2022-02-26","T20I","SL","Dharamsala","SRI LANKA TOUR OF INDIA, 2022",null,1,0,2,0,0,50],["2022-02-24","T20I","SL","Lucknow","SRI LANKA TOUR OF INDIA, 2022",null,44,0,32,2,1,137.5],["2022-02-20","T20I","WI","Kolkata","WEST INDIES TOUR OF INDIA, 2022",null,7,0,15,0,0,46.6],["2022-02-18","T20I","WI","Kolkata","WEST INDIES TOUR OF INDIA, 2022",null,19,0,18,2,1,105.5],["2022-02-16","T20I","WI","Kolkata","WEST INDIES TOUR OF INDIA, 2022",null,40,0,19,4,3,210.5],["2022-02-11","ODI","WI","Ahmedabad","WEST INDIES TOUR OF INDIA, 2022",null,13,0,15,3,0,86.6],["2022-02-09","ODI","WI","Ahmedabad","WEST INDIES TOUR OF INDIA, 2022",null,5,0,8,0,0,62.5],["2022-02-06","ODI","WI","Ahmedabad","WEST INDIES TOUR OF INDIA, 2022",null,60,0,51,10,1,117.6],["2021-11-21","T20I","NZ","Kolkata","NEW ZEALAND TOUR OF INDIA, 2021",null,56,0,31,5,3,180.6],["2021-11-19","T20I","NZ","Ranchi","NEW ZEALAND TOUR OF INDIA, 2021",null,55,0,36,1,5,152.7],["2021-11-17","T20I","NZ","Jaipur","NEW ZEALAND TOUR OF INDIA, 2021",null,48,0,36,5,2,133.3],["2021-11-08","T20I","NAM","Dubai","ICC MENS T20 WORLD CUP 2021",null,56,0,37,7,2,151.3],["2021-11-05","T20I","SCO","Dubai","ICC MENS T20 WORLD CUP 2021",null,30,0,16,5,1,187.5],["2021-11-03","T20I","AFG","Abu Dhabi","ICC MENS T20 WORLD CUP 2021",null,74,0,47,8,3,157.4],["2021-10-31","T20I","NZ","Dubai","ICC MENS T20 WORLD CUP 2021",null,14,0,14,1,1,100],["2021-10-24","T20I","PAK","Dubai","ICC MENS T20 WORLD CUP 2021",null,0,0,1,0,0,0],["2021-10-08","IPL","SRH","Abu Dhabi","INDIAN PREMIER LEAGUE 2021",null,18,0,13,3,0,138.4],["2021-10-05","IPL","RR","Sharjah","INDIAN PREMIER LEAGUE 2021",null,22,0,13,1,2,169.2],["2021-10-02","IPL","DC","Sharjah","INDIAN PREMIER LEAGUE 2021",null,7,0,10,1,0,70],["2021-09-28","IPL","PBKS","Abu Dhabi","INDIAN PREMIER LEAGUE 2021",null,8,0,10,1,0,80],["2021-09-26","IPL","RCB","Dubai","INDIAN PREMIER LEAGUE 2021",null,43,0,28,5,1,153.5],["2021-09-23","IPL","KKR","Abu Dhabi","INDIAN PREMIER LEAGUE 2021",null,33,0,30,4,0,110],["2021-09-02","Test","ENG","London","INDIA TOUR OF ENGLAND, 2021",1,11,0,null,1,0,40.7],["2021-09-02","Test","ENG","London","INDIA TOUR OF ENGLAND, 2021",2,127,0,null,14,1,49.6],["2021-08-25","Test","ENG","Leeds","INDIA TOUR OF ENGLAND, 2021",1,19,0,null,1,0,18.1],["2021-08-25","Test","ENG","Leeds","INDIA TOUR OF ENGLAND, 2021",2,59,0,null,7,1,37.8],["2021-08-12","Test","ENG","London","INDIA TOUR OF ENGLAND, 2021",1,83,0,null,11,1,57.2],["2021-08-12","Test","ENG","London","INDIA TOUR OF ENGLAND, 2021",2,21,0,null,2,1,58.3],["2021-08-04","Test","ENG","Nottingham","INDIA TOUR OF ENGLAND, 2021",1,36,0,null,6,0,33.6],["2021-08-04","Test","ENG","Nottingham","INDIA TOUR OF ENGLAND, 2021",2,12,1,null,0,0,35.2],["2021-06-18","Test","NZ","Southampton","ICC WORLD TEST CHAMPIONSHIP FINAL 2021",1,34,0,null,6,0,50],["2021-06-18","Test","NZ","Southampton","ICC WORLD TEST CHAMPIONSHIP FINAL 2021",2,30,0,null,2,0,37],["2021-05-01","IPL","CSK","Delhi","INDIAN PREMIER LEAGUE 2021",null,35,0,24,4,1,145.8],["2021-04-29","IPL","RR","Delhi","INDIAN PREMIER LEAGUE 2021",null,14,0,17,0,1,82.3],["2021-04-23","IPL","PBKS","Chennai","INDIAN PREMIER LEAGUE 2021",null,63,0,52,5,2,121.1],["2021-04-20","IPL","DC","Chennai","INDIAN PREMIER LEAGUE 2021",null,44,0,30,3,3,146.6],["2021-04-17","IPL","SRH","Chennai","INDIAN PREMIER LEAGUE 2021",null,32,0,25,2,2,128],["2021-04-13","IPL","KKR","Chennai","INDIAN PREMIER LEAGUE 2021",null,43,0,32,3,1,134.3],["2021-04-09","IPL","RCB","Chennai","INDIAN PREMIER LEAGUE 2021",null,19,0,15,1,1,126.6],["2021-03-28","ODI","ENG","Pune","ENGLAND TOUR OF INDIA, 2021",null,37,0,37,6,0,100],["2021-03-26","ODI","ENG","Pune","ENGLAND TOUR OF INDIA, 2021",null,25,0,25,5,0,100],["2021-03-23","ODI","ENG","Pune","ENGLAND TOUR OF INDIA, 2021",null,28,0,42,4,0,66.6],["2021-03-20","T20I","ENG","Ahmedabad","ENGLAND TOUR OF INDIA, 2021",null,64,0,34,4,5,188.2],["2021-03-18","T20I","ENG","Ahmedabad","ENGLAND TOUR OF INDIA, 2021",null,12,0,12,1,1,100],["2021-03-16","T20I","ENG","Ahmedabad","ENGLAND TOUR OF INDIA, 2021",null,15,0,17,2,0,88.2],["2021-03-04","Test","ENG","Ahmedabad","ENGLAND TOUR OF INDIA, 2021",1,49,0,null,7,0,34],["2021-02-24","Test","ENG","Ahmedabad","ENGLAND TOUR OF INDIA, 2021",1,66,0,null,11,0,68.7],["2021-02-24","Test","ENG","Ahmedabad","ENGLAND TOUR OF INDIA, 2021",2,25,1,null,3,1,100],["2021-02-13","Test","ENG","Chennai","ENGLAND TOUR OF INDIA, 2021",1,161,0,null,18,2,69.7],["2021-02-13","Test","ENG","Chennai","ENGLAND TOUR OF INDIA, 2021",2,26,0,null,2,1,37.1],["2021-02-05","Test","ENG","Chennai","INDIA TOUR OF ENGLAND, 2021",1,6,0,null,1,0,66.6],["2021-02-05","Test","ENG","Chennai","INDIA TOUR OF ENGLAND, 2021",2,12,0,null,1,1,60],["2021-01-15","Test","AUS","Brisbane","INDIA TOUR OF AUSTRALIA, 2020-21",1,44,0,null,6,0,59.4],["2021-01-15","Test","AUS","Brisbane","INDIA TOUR OF AUSTRALIA, 2020-21",2,7,0,null,1,0,33.3],["2021-01-07","Test","AUS","Sydney","INDIA TOUR OF AUSTRALIA, 2020-21",1,26,0,null,3,1,33.7],["2021-01-07","Test","AUS","Sydney","INDIA TOUR OF AUSTRALIA, 2020-21",2,52,0,null,5,1,53],["2020-11-10","IPL","DC","Dubai","INDIAN PREMIER LEAGUE 2020",null,68,0,51,5,4,133.3],["2020-11-05","IPL","DC","Dubai","INDIAN PREMIER LEAGUE 2020",null,0,0,1,0,0,0],["2020-11-03","IPL","SRH","Sharjah","INDIAN PREMIER LEAGUE 2020",null,4,0,7,0,0,57.1],["2020-10-18","IPL","PBKS","Dubai","INDIAN PREMIER LEAGUE 2020",null,9,0,8,2,0,112.5],["2020-10-16","IPL","KKR","Abu Dhabi","INDIAN PREMIER LEAGUE 2020",null,35,0,36,5,1,97.2],["2020-10-11","IPL","DC","Abu Dhabi","INDIAN PREMIER LEAGUE 2020",null,5,0,12,0,0,41.6],["2020-10-06","IPL","RR","Abu Dhabi","INDIAN PREMIER LEAGUE 2020",null,35,0,23,2,3,152.1],["2020-10-04","IPL","SRH","Sharjah","INDIAN PREMIER LEAGUE 2020",null,6,0,5,0,1,120],["2020-10-01","IPL","PBKS","Abu Dhabi","INDIAN PREMIER LEAGUE 2020",null,70,0,45,8,3,155.5],["2020-09-28","IPL","RCB","Dubai","INDIAN PREMIER LEAGUE 2020",null,8,0,8,0,1,100],["2020-09-23","IPL","KKR","Abu Dhabi","INDIAN PREMIER LEAGUE 2020",null,80,0,54,3,6,148.1],["2020-09-19","IPL","CSK","Abu Dhabi","INDIAN PREMIER LEAGUE 2020",null,12,0,10,2,0,120],["2020-02-02","T20I","NZ","Mount Maunganui","INDIA TOUR OF NEW ZEALAND, 2020",null,60,0,41,3,3,146.3],["2020-01-29","T20I","NZ","Hamilton","INDIA TOUR OF NEW ZEALAND, 2020",null,65,0,40,6,3,162.5],["2020-01-26","T20I","NZ","Auckland","INDIA TOUR OF NEW ZEALAND, 2020",null,8,0,6,2,0,133.3],["2020-01-24","T20I","NZ","Auckland","INDIA TOUR OF NEW ZEALAND, 2020",null,7,0,6,0,1,116.6],["2020-01-19","ODI","AUS","Bengaluru","AUSTRALIA TOUR OF INDIA, 2020",null,119,0,128,8,6,92.9],["2020-01-17","ODI","AUS","Rajkot","AUSTRALIA TOUR OF INDIA, 2020",null,42,0,44,6,0,95.4],["2020-01-14","ODI","AUS","Mumbai","AUSTRALIA TOUR OF INDIA, 2020",null,10,0,15,2,0,66.6],["2019-12-22","ODI","WI","Cuttack","WEST INDIES TOUR OF INDIA, 2019",null,63,0,63,8,1,100],["2019-12-18","ODI","WI","Visakhapatnam","WEST INDIES TOUR OF INDIA, 2019",null,159,0,138,17,5,115.2],["2019-12-15","ODI","WI","Chennai","WEST INDIES TOUR OF INDIA, 2019",null,36,0,56,6,0,64.2],["2019-12-11","T20I","WI","Mumbai","WEST INDIES TOUR OF INDIA, 2019",null,71,0,34,6,5,208.8],["2019-12-08","T20I","WI","Thiruvananthapuram","WEST INDIES TOUR OF INDIA, 2019",null,15,0,18,2,0,83.3],["2019-12-06","T20I","WI","Hyderabad","WEST INDIES TOUR OF INDIA, 2019",null,8,0,10,1,0,80],["2019-11-22","Test","BAN","Kolkata","BANGLADESH TOUR OF INDIA, 2019",1,21,0,null,2,1,60],["2019-11-14","Test","BAN","Indore","BANGLADESH TOUR OF INDIA, 2019",1,6,0,null,1,0,42.8],["2019-11-10","T20I","BAN","Nagpur","BANGLADESH TOUR OF INDIA, 2019",null,2,0,6,0,0,33.3],["2019-11-07","T20I","BAN","Rajkot","BANGLADESH TOUR OF INDIA, 2019",null,85,0,43,6,6,197.6],["2019-11-03","T20I","BAN","Delhi","BANGLADESH TOUR OF INDIA, 2019",null,9,0,5,2,0,180],["2019-10-19","Test","RSA","Ranchi","SOUTH AFRICA TOUR OF INDIA, 2019",1,212,0,null,28,6,83.1],["2019-10-10","Test","RSA","Pune","SOUTH AFRICA TOUR OF INDIA, 2019",1,14,0,null,1,0,40],["2019-10-02","Test","RSA","Visakhapatnam","SOUTH AFRICA TOUR OF INDIA, 2019",1,176,0,null,23,6,72.1],["2019-10-02","Test","RSA","Visakhapatnam","SOUTH AFRICA TOUR OF INDIA, 2019",2,127,0,null,10,7,85.2],["2019-09-22","T20I","RSA","Bengaluru","SOUTH AFRICA TOUR OF INDIA, 2019",null,9,0,8,2,0,112.5],["2019-09-18","T20I","RSA","Mohali","SOUTH AFRICA TOUR OF INDIA, 2019",null,12,0,12,0,2,100],["2019-08-14","ODI","WI","Port of Spain, Trinidad","INDIA TOUR OF WEST INDIES, 2019",null,10,0,6,2,0,166.6],["2019-08-11","ODI","WI","Port of Spain, Trinidad","INDIA TOUR OF WEST INDIES, 2019",null,18,0,34,2,0,52.9],["2019-08-04","T20I","WI","Lauderhill, Florida","INDIA TOUR OF WEST INDIES, 2019",null,67,0,51,6,3,131.3],["2019-08-03","T20I","WI","Lauderhill, Florida","INDIA TOUR OF WEST INDIES, 2019",null,24,0,25,2,2,96],["2019-07-09","ODI","NZ","Manchester","ICC CRICKET WORLD CUP 2019",null,1,0,4,0,0,25],["2019-07-06","ODI","SL","Leeds","ICC CRICKET WORLD CUP 2019",null,103,0,94,14,2,109.5],["2019-07-02","ODI","BAN","Birmingham","ICC CRICKET WORLD CUP 2019",null,104,0,92,7,5,113],["2019-06-30","ODI","ENG","Birmingham","ICC CRICKET WORLD CUP 2019",null,102,0,109,15,0,93.5],["2019-06-27","ODI","WI","Manchester","ICC CRICKET WORLD CUP 2019",null,18,0,23,1,1,78.2],["2019-06-22","ODI","AFG","Southampton","ICC CRICKET WORLD CUP 2019",null,1,0,10,0,0,10],["2019-06-16","ODI","PAK","Manchester","ICC CRICKET WORLD CUP 2019",null,140,0,113,14,3,123.8],["2019-06-09","ODI","AUS","London","ICC CRICKET WORLD CUP 2019",null,57,0,70,3,1,81.4],["2019-06-05","ODI","RSA","Southampton","ICC CRICKET WORLD CUP 2019",null,122,1,144,13,2,84.7],["2019-05-12","IPL","CSK","Hyderabad","INDIAN PREMIER LEAGUE 2019",null,15,0,14,1,1,107.1],["2019-05-07","IPL","CSK","Chennai","INDIAN PREMIER LEAGUE 2019",null,4,0,2,1,0,200],["2019-05-05","IPL","KKR","Mumbai","INDIAN PREMIER LEAGUE 2019",null,55,1,48,8,0,114.5],["2019-05-02","IPL","SRH","Mumbai","INDIAN PREMIER LEAGUE 2019",null,24,0,18,5,0,133.3],["2019-04-28","IPL","KKR","Kolkata","INDIAN PREMIER LEAGUE 2019",null,12,0,9,3,0,133.3],["2019-04-26","IPL","CSK","Chennai","INDIAN PREMIER LEAGUE 2019",null,67,0,48,6,3,139.5],["2019-04-20","IPL","RR","Jaipur","INDIAN PREMIER LEAGUE 2019",null,5,0,7,1,0,71.4],["2019-04-18","IPL","DC","Delhi","INDIAN PREMIER LEAGUE 2019",null,30,0,22,3,1,136.3],["2019-04-15","IPL","RCB","Mumbai","INDIAN PREMIER LEAGUE 2019",null,28,0,19,2,2,147.3],["2019-04-13","IPL","RR","Mumbai","INDIAN PREMIER LEAGUE 2019",null,47,0,32,6,1,146.8],["2019-04-06","IPL","SRH","Hyderabad","INDIAN PREMIER LEAGUE 2019",null,11,0,14,0,1,78.5],["2019-04-03","IPL","CSK","Mumbai","INDIAN PREMIER LEAGUE 2019",null,13,0,18,1,0,72.2],["2019-03-30","IPL","PBKS","Mohali","INDIAN PREMIER LEAGUE 2019",null,32,0,18,5,0,177.7],["2019-03-28","IPL","RCB","Bengaluru","INDIAN PREMIER LEAGUE 2019",null,48,0,33,8,1,145.4],["2019-03-24","IPL","DC","Mumbai","INDIAN PREMIER LEAGUE 2019",null,14,0,13,2,0,107.6],["2019-03-13","ODI","AUS","Delhi","AUSTRALIA TOUR OF INDIA, 2019",null,56,0,89,4,0,62.9],["2019-03-10","ODI","AUS","Mohali","AUSTRALIA TOUR OF INDIA, 2019",null,95,0,92,7,2,103.2],["2019-03-08","ODI","AUS","Ranchi","AUSTRALIA TOUR OF INDIA, 2019",null,14,0,14,2,1,100],["2019-03-05","ODI","AUS","Nagpur","AUSTRALIA TOUR OF INDIA, 2019",null,0,0,6,0,0,0],["2019-03-02","ODI","AUS","Hyderabad","AUSTRALIA TOUR OF INDIA, 2019",null,37,0,66,5,0,56],["2019-02-24","T20I","AUS","Visakhapatnam","AUSTRALIA TOUR OF INDIA, 2019",null,5,0,8,0,0,62.5],["2019-02-10","T20I","NZ","Hamilton","INDIA TOUR OF NEW ZEALAND, 2019",null,38,0,32,3,0,118.7],["2019-02-08","T20I","NZ","Auckland","INDIA TOUR OF NEW ZEALAND, 2019",null,50,0,29,3,4,172.4],["2019-02-06","T20I","NZ","Wellington","INDIA TOUR OF NEW ZEALAND, 2019",null,1,0,5,0,0,20],["2019-02-03","ODI","NZ","Wellington","INDIA TOUR OF NEW ZEALAND, 2019",null,2,0,16,0,0,12.5],["2019-01-31","ODI","NZ","Hamilton","INDIA TOUR OF NEW ZEALAND, 2019",null,7,0,23,0,0,30.4],["2019-01-28","ODI","NZ","Mount Maunganui","INDIA TOUR OF NEW ZEALAND, 2019",null,62,0,77,3,2,80.5],["2019-01-26","ODI","NZ","Mount Maunganui","INDIA TOUR OF NEW ZEALAND, 2019",null,87,0,96,9,3,90.6],["2019-01-23","ODI","NZ","Napier","INDIA TOUR OF NEW ZEALAND, 2019",null,11,0,24,1,0,45.8],["2019-01-18","ODI","AUS","Melbourne","INDIA TOUR OF AUSTRALIA, 2018-19",null,9,0,17,1,0,52.9],["2019-01-15","ODI","AUS","Adelaide","INDIA TOUR OF AUSTRALIA, 2018-19",null,43,0,52,2,2,82.6],["2019-01-12","ODI","AUS","Sydney","INDIA TOUR OF AUSTRALIA, 2018-19",null,133,0,129,10,6,103.1],["2018-12-26","Test","AUS","Melbourne","INDIA TOUR OF AUSTRALIA, 2018-19",1,63,1,null,5,0,55.2],["2018-12-26","Test","AUS","Melbourne","INDIA TOUR OF AUSTRALIA, 2018-19",2,5,0,null,0,0,27.7],["2018-12-06","Test","AUS","Adelaide","INDIA TOUR OF AUSTRALIA, 2018-19",1,37,0,null,2,3,60.6],["2018-12-06","Test","AUS","Adelaide","INDIA TOUR OF AUSTRALIA, 2018-19",2,1,0,null,0,0,16.6],["2018-11-25","T20I","AUS","Sydney","INDIA TOUR OF AUSTRALIA, 2018-19",null,23,0,16,1,2,143.7],["2018-11-21","T20I","AUS","Brisbane","INDIA TOUR OF AUSTRALIA, 2018-19",null,7,0,8,0,0,87.5],["2018-11-11","T20I","WI","Chennai","WINDIES TOUR OF INDIA, 2018",null,4,0,6,1,0,66.6],["2018-11-06","T20I","WI","Lucknow","WINDIES TOUR OF INDIA, 2018",null,111,1,61,8,7,181.9],["2018-11-04","T20I","WI","Kolkata","WINDIES TOUR OF INDIA, 2018",null,6,0,6,1,0,100],["2018-11-01","ODI","WI","Thiruvananthapuram","WINDIES TOUR OF INDIA, 2018",null,63,1,56,5,4,112.5],["2018-10-29","ODI","WI","Mumbai","WINDIES TOUR OF INDIA, 2018",null,162,0,137,20,4,118.2],["2018-10-27","ODI","WI","Pune","WINDIES TOUR OF INDIA, 2018",null,8,0,9,2,0,88.8],["2018-10-24","ODI","WI","Visakhapatnam","WINDIES TOUR OF INDIA, 2018",null,4,0,8,1,0,50],["2018-10-21","ODI","WI","Guwahati","WINDIES TOUR OF INDIA, 2018",null,152,1,117,15,8,129.9],["2018-09-28","ODI","BAN","Dubai","ASIA CUP, 2018",null,48,0,55,3,3,87.2],["2018-09-23","ODI","PAK","Dubai","ASIA CUP, 2018",null,111,1,119,7,4,93.2],["2018-09-21","ODI","BAN","Dubai","ASIA CUP, 2018",null,83,1,104,5,3,79.8],["2018-09-19","ODI","PAK","Dubai","ASIA CUP, 2018",null,52,0,39,6,3,133.3],["2018-09-18","ODI","HKC","Dubai","ASIA CUP, 2018",null,23,0,22,4,0,104.5],["2018-07-17","ODI","ENG","Leeds","INDIA TOUR OF ENGLAND, 2018",null,2,0,18,0,0,11.1],["2018-07-14","ODI","ENG","London","INDIA TOUR OF ENGLAND, 2018",null,15,0,26,2,0,57.6],["2018-07-12","ODI","ENG","Nottingham","INDIA TOUR OF ENGLAND, 2018",null,137,1,114,15,4,120.1],["2018-07-08","T20I","ENG","Bristol","INDIA TOUR OF ENGLAND, 2018",null,100,1,56,11,5,178.5],["2018-07-06","T20I","ENG","Cardiff","INDIA TOUR OF ENGLAND, 2018",null,5,0,9,1,0,55.5],["2018-07-03","T20I","ENG","Manchester","INDIA TOUR OF ENGLAND, 2018",null,32,0,30,3,1,106.6],["2018-06-29","T20I","IRE","Dublin","INDIA TOUR OF IRELAND, 2018",null,0,0,2,0,0,0],["2018-06-27","T20I","IRE","Dublin","INDIA TOUR OF IRELAND, 2018",null,97,0,61,8,5,159],["2018-05-20","IPL","DC","Delhi","INDIAN PREMIER LEAGUE, 2018",null,13,0,11,1,0,118.1],["2018-05-16","IPL","PBKS","Mumbai","INDIAN PREMIER LEAGUE, 2018",null,6,0,10,0,0,60],["2018-05-13","IPL","RR","Mumbai","INDIAN PREMIER LEAGUE, 2018",null,0,0,1,0,0,0],["2018-05-09","IPL","KKR","Kolkata","INDIAN PREMIER LEAGUE, 2018",null,36,0,31,2,1,116.1],["2018-05-06","IPL","KKR","Mumbai","INDIAN PREMIER LEAGUE, 2018",null,11,0,11,1,0,100],["2018-05-04","IPL","PBKS","Indore","INDIAN PREMIER LEAGUE, 2018",null,24,1,15,1,2,160],["2018-05-01","IPL","RCB","Bengaluru","INDIAN PREMIER LEAGUE, 2018",null,0,0,1,0,0,0],["2018-04-28","IPL","CSK","Pune","INDIAN PREMIER LEAGUE, 2018",null,56,1,33,6,2,169.7],["2018-04-24","IPL","SRH","Mumbai","INDIAN PREMIER LEAGUE, 2018",null,2,0,6,0,0,33.3],["2018-04-22","IPL","RR","Jaipur","INDIAN PREMIER LEAGUE, 2018",null,0,0,1,0,0,0],["2018-04-17","IPL","RCB","Mumbai","INDIAN PREMIER LEAGUE, 2018",null,94,0,52,10,5,180.7],["2018-04-14","IPL","DC","Mumbai","INDIAN PREMIER LEAGUE, 2018",null,18,0,15,2,0,120],["2018-04-12","IPL","SRH","Hyderabad","INDIAN PREMIER LEAGUE, 2018",null,11,0,10,1,1,110],["2018-04-07","IPL","CSK","Mumbai","INDIAN PREMIER LEAGUE, 2018",null,15,0,18,1,1,83.3],["2018-03-18","T20I","BAN","Colombo","INDIA AND BANGLADESH IN SRI LANKA T20I TRI-SERIES, 2018",null,56,0,42,4,3,133.3],["2018-03-14","T20I","BAN","Colombo","INDIA AND BANGLADESH IN SRI LANKA T20I TRI-SERIES, 2018",null,89,0,61,5,5,145.9],["2018-03-12","T20I","SL","Colombo","INDIA AND BANGLADESH IN SRI LANKA T20I TRI-SERIES, 2018",null,11,0,7,1,1,157.1],["2018-03-08","T20I","BAN","Colombo","INDIA AND BANGLADESH IN SRI LANKA T20I TRI-SERIES, 2018",null,17,0,13,3,0,130.7],["2018-03-06","T20I","SL","Colombo","INDIA AND BANGLADESH IN SRI LANKA T20I TRI-SERIES, 2018",null,0,0,4,0,0,0],["2018-02-24","T20I","RSA","Cape Town","INDIA TOUR OF SOUTH AFRICA, 2017-18",null,11,0,8,2,0,137.5],["2018-02-21","T20I","RSA","Centurion","INDIA TOUR OF SOUTH AFRICA, 2017-18",null,0,0,1,0,0,0],["2018-02-18","T20I","RSA","Johannesburg","INDIA TOUR OF SOUTH AFRICA, 2017-18",null,21,0,9,2,2,233.3],["2018-02-16","ODI","RSA","Centurion","INDIA TOUR OF SOUTH AFRICA, 2017-18",null,15,0,13,3,0,115.3],["2018-02-13","ODI","RSA","Gqeberha","INDIA TOUR OF SOUTH AFRICA, 2017-18",null,115,0,126,11,4,91.2],["2018-02-10","ODI","RSA","Johannesburg","INDIA TOUR OF SOUTH AFRICA, 2017-18",null,5,0,13,1,0,38.4],["2018-02-07","ODI","RSA","Cape Town","INDIA TOUR OF SOUTH AFRICA, 2017-18",null,0,0,6,0,0,0],["2018-02-04","ODI","RSA","Centurion","INDIA TOUR OF SOUTH AFRICA, 2017-18",null,15,0,17,2,1,88.2],["2018-02-01","ODI","RSA","Durban","INDIA TOUR OF SOUTH AFRICA, 2017-18",null,20,0,30,2,1,66.6],["2018-01-13","Test","RSA","Centurion","INDIA TOUR OF SOUTH AFRICA, 2017-18",1,10,0,null,2,0,37],["2018-01-13","Test","RSA","Centurion","INDIA TOUR OF SOUTH AFRICA, 2017-18",2,47,0,null,6,1,63.5],["2018-01-05","Test","RSA","Cape Town","INDIA TOUR OF SOUTH AFRICA, 2017-18",1,11,0,null,1,0,18.6],["2018-01-05","Test","RSA","Cape Town","INDIA TOUR OF SOUTH AFRICA, 2017-18",2,10,0,null,0,0,33.3],["2017-12-24","T20I","SL","Mumbai","SRI LANKA TOUR OF INDIA, 2017",null,27,0,20,4,1,135],["2017-12-22","T20I","SL","Indore","SRI LANKA TOUR OF INDIA, 2017",null,118,0,43,12,10,274.4],["2017-12-20","T20I","SL","Cuttack","SRI LANKA TOUR OF INDIA, 2017",null,17,0,13,2,0,130.7],["2017-12-17","ODI","SL","Visakhapatnam","SRI LANKA TOUR OF INDIA, 2017",null,7,0,14,0,1,50],["2017-12-13","ODI","SL","Mohali","SRI LANKA TOUR OF INDIA, 2017",null,208,1,153,13,12,135.9],["2017-12-10","ODI","SL","Dharamsala","SRI LANKA TOUR OF INDIA, 2017",null,2,0,13,0,0,15.3],["2017-12-02","Test","SL","Delhi","SRI LANKA TOUR OF INDIA, 2017",1,65,0,null,7,2,63.7],["2017-12-02","Test","SL","Delhi","SRI LANKA TOUR OF INDIA, 2017",2,50,1,null,5,0,102],["2017-11-24","Test","SL","Nagpur","SRI LANKA TOUR OF INDIA, 2017",1,102,1,null,8,1,63.7],["2017-11-07","T20I","NZ","Thiruvananthapuram","NEW ZEALAND TOUR OF INDIA, 2017",null,8,0,9,1,0,88.8],["2017-11-04","T20I","NZ","Rajkot","NEW ZEALAND TOUR OF INDIA, 2017",null,5,0,6,1,0,83.3],["2017-11-01","T20I","NZ","Delhi","NEW ZEALAND TOUR OF INDIA, 2017",null,80,0,55,6,4,145.4],["2017-10-29","ODI","NZ","Kanpur","NEW ZEALAND TOUR OF INDIA, 2017",null,147,0,138,18,2,106.5],["2017-10-25","ODI","NZ","Pune","NEW ZEALAND TOUR OF INDIA, 2017",null,7,0,19,1,0,36.8],["2017-10-22","ODI","NZ","Mumbai","NEW ZEALAND TOUR OF INDIA, 2017",null,20,0,18,0,2,111.1],["2017-10-10","T20I","AUS","Guwahati","AUSTRALIA TOUR OF INDIA, 2017",null,8,0,4,2,0,200],["2017-10-07","T20I","AUS","Ranchi","AUSTRALIA TOUR OF INDIA, 2017",null,11,0,7,1,1,157.1],["2017-10-01","ODI","AUS","Nagpur","AUSTRALIA TOUR OF INDIA, 2017",null,125,0,109,11,5,114.6],["2017-09-28","ODI","AUS","Bengaluru","AUSTRALIA TOUR OF INDIA, 2017",null,65,0,55,1,5,118.1],["2017-09-24","ODI","AUS","Indore","AUSTRALIA TOUR OF INDIA, 2017",null,71,0,62,6,4,114.5],["2017-09-21","ODI","AUS","Kolkata","AUSTRALIA TOUR OF INDIA, 2017",null,7,0,14,1,0,50],["2017-09-17","ODI","AUS","Chennai","AUSTRALIA TOUR OF INDIA, 2017",null,28,0,44,3,0,63.6],["2017-09-06","T20I","SL","Colombo","INDIA TOUR OF SRI LANKA, 2017",null,9,0,8,1,0,112.5],["2017-09-03","ODI","SL","Colombo","INDIA TOUR OF SRI LANKA, 2017",null,16,0,20,1,0,80],["2017-08-31","ODI","SL","Colombo","INDIA TOUR OF SRI LANKA, 2017",null,104,0,88,11,3,118.1],["2017-08-27","ODI","SL","Pallekele","INDIA TOUR OF SRI LANKA, 2017",null,124,1,145,16,2,85.5],["2017-08-24","ODI","SL","Pallekele","INDIA TOUR OF SRI LANKA, 2017",null,54,0,45,5,3,120],["2017-08-20","ODI","SL","Dambulla","INDIA TOUR OF SRI LANKA, 2017",null,4,0,13,0,0,30.7],["2017-06-18","ODI","PAK","London","ICC CHAMPIONS TROPHY, 2017",null,0,0,3,0,0,0],["2017-06-15","ODI","BAN","Birmingham","ICC CHAMPIONS TROPHY, 2017",null,123,1,129,15,1,95.3],["2017-06-11","ODI","RSA","London","ICC CHAMPIONS TROPHY, 2017",null,12,0,20,1,1,60],["2017-06-08","ODI","SL","London","ICC CHAMPIONS TROPHY, 2017",null,78,0,79,6,3,98.7],["2017-06-04","ODI","PAK","Birmingham","ICC CHAMPIONS TROPHY, 2017",null,91,0,119,7,2,76.4],["2017-05-21","IPL","RPS","Hyderabad","INDIAN PREMIER LEAGUE, 2017",null,24,0,22,4,0,109],["2017-05-19","IPL","KKR","Bengaluru","INDIAN PREMIER LEAGUE, 2017",null,26,0,24,1,1,108.3],["2017-05-16","IPL","RPS","Mumbai","INDIAN PREMIER LEAGUE, 2017",null,1,0,2,0,0,50],["2017-05-13","IPL","KKR","Kolkata","INDIAN PREMIER LEAGUE, 2017",null,27,0,21,4,1,128.5],["2017-05-11","IPL","PBKS","Mumbai","INDIAN PREMIER LEAGUE, 2017",null,5,0,7,0,0,71.4],["2017-05-08","IPL","SRH","Hyderabad","INDIAN PREMIER LEAGUE, 2017",null,67,0,45,6,2,148.8],["2017-05-06","IPL","DC","Delhi","INDIAN PREMIER LEAGUE, 2017",null,10,0,6,1,0,166.6],["2017-05-01","IPL","RCB","Mumbai","INDIAN PREMIER LEAGUE, 2017",null,56,1,37,6,1,151.3],["2017-04-29","IPL","GL","Rajkot","INDIAN PREMIER LEAGUE, 2017",null,5,0,13,0,0,38.4],["2017-04-24","IPL","RPS","Mumbai","INDIAN PREMIER LEAGUE, 2017",null,58,0,39,6,3,148.7],["2017-04-22","IPL","DC","Mumbai","INDIAN PREMIER LEAGUE, 2017",null,5,0,9,0,0,55.5],["2017-04-16","IPL","GL","Mumbai","INDIAN PREMIER LEAGUE, 2017",null,40,1,29,3,1,137.9],["2017-04-14","IPL","RCB","Bengaluru","INDIAN PREMIER LEAGUE, 2017",null,0,0,2,0,0,0],["2017-04-12","IPL","SRH","Mumbai","INDIAN PREMIER LEAGUE, 2017",null,4,0,4,0,0,100],["2017-04-09","IPL","KKR","Mumbai","INDIAN PREMIER LEAGUE, 2017",null,2,0,6,0,0,33.3],["2017-04-06","IPL","RPS","Pune","INDIAN PREMIER LEAGUE, 2017",null,3,0,7,0,0,42.8],["2016-10-29","ODI","NZ","Visakhapatnam","NEW ZEALAND TOUR OF INDIA, 2016",null,70,0,65,5,3,107.6],["2016-10-26","ODI","NZ","Ranchi","NEW ZEALAND TOUR OF INDIA, 2016",null,11,0,19,2,0,57.8],["2016-10-23","ODI","NZ","Mohali","NEW ZEALAND TOUR OF INDIA, 2016",null,13,0,21,2,0,61.9],["2016-10-20","ODI","NZ","Delhi","NEW ZEALAND TOUR OF INDIA, 2016",null,15,0,27,1,1,55.5],["2016-10-16","ODI","NZ","Dharamsala","NEW ZEALAND TOUR OF INDIA, 2016",null,14,0,26,1,1,53.8],["2016-10-08","Test","NZ","Indore","NEW ZEALAND TOUR OF INDIA, 2016",1,51,1,null,3,2,80.9],["2016-09-30","Test","NZ","Kolkata","NEW ZEALAND TOUR OF INDIA, 2016",1,2,0,null,0,0,16.6],["2016-09-30","Test","NZ","Kolkata","NEW ZEALAND TOUR OF INDIA, 2016",2,82,0,null,9,2,62.1],["2016-09-22","Test","NZ","Kanpur","NEW ZEALAND TOUR OF INDIA, 2016",1,35,0,null,3,1,52.2],["2016-09-22","Test","NZ","Kanpur","NEW ZEALAND TOUR OF INDIA, 2016",2,68,1,null,8,0,73.1],["2016-08-28","T20I","WI","Lauderhill, Florida","INDIA V WEST INDIES IN USA, 2016",null,10,1,8,0,1,125],["2016-08-27","T20I","WI","Lauderhill, Florida","INDIA V WEST INDIES IN USA, 2016",null,62,0,28,4,4,221.4],["2016-08-09","Test","WI","Gros Islet, St Lucia","INDIA TOUR OF WEST INDIES, 2016",1,9,0,null,2,0,39.1],["2016-08-09","Test","WI","Gros Islet, St Lucia","INDIA TOUR OF WEST INDIES, 2016",2,41,0,null,1,3,69.4],["2016-05-21","IPL","GL","Kanpur","INDIAN PREMIER LEAGUE, 2016",null,30,0,17,4,2,176.4],["2016-05-15","IPL","DC","Visakhapatnam","INDIAN PREMIER LEAGUE, 2016",null,31,0,21,1,3,147.6],["2016-05-13","IPL","PBKS","Visakhapatnam","INDIAN PREMIER LEAGUE, 2016",null,15,0,24,1,0,62.5],["2016-05-11","IPL","RCB","Bengaluru","INDIAN PREMIER LEAGUE, 2016",null,25,0,24,3,0,104.1],["2016-05-08","IPL","SRH","Visakhapatnam","INDIAN PREMIER LEAGUE, 2016",null,5,0,3,1,0,166.6],["2016-05-01","IPL","RPS","Pune","INDIAN PREMIER LEAGUE, 2016",null,85,1,60,8,3,141.6],["2016-04-28","IPL","KKR","Mumbai","INDIAN PREMIER LEAGUE, 2016",null,68,1,49,8,2,138.7],["2016-04-25","IPL","PBKS","Mohali","INDIAN PREMIER LEAGUE, 2016",null,0,0,2,0,0,0],["2016-04-23","IPL","DC","Delhi","INDIAN PREMIER LEAGUE, 2016",null,65,0,48,7,1,135.4],["2016-04-20","IPL","RCB","Mumbai","INDIAN PREMIER LEAGUE, 2016",null,62,0,44,4,3,140.9],["2016-04-18","IPL","SRH","Hyderabad","INDIAN PREMIER LEAGUE, 2016",null,5,0,8,0,0,62.5],["2016-04-16","IPL","GL","Mumbai","INDIAN PREMIER LEAGUE, 2016",null,7,0,9,1,0,77.7],["2016-04-13","IPL","KKR","Kolkata","INDIAN PREMIER LEAGUE, 2016",null,84,1,54,10,2,155.5],["2016-04-09","IPL","RPS","Mumbai","INDIAN PREMIER LEAGUE, 2016",null,7,0,5,1,0,140],["2016-03-31","T20I","WI","Mumbai","ICC WORLD T20, 2016",null,43,0,31,3,3,138.7],["2016-03-27","T20I","AUS","Mohali","ICC WORLD T20, 2016",null,12,0,17,1,0,70.5],["2016-03-23","T20I","BAN","Bengaluru","ICC WORLD T20, 2016",null,18,0,16,1,1,112.5],["2016-03-19","T20I","PAK","Kolkata","ICC WORLD T20, 2016",null,10,0,11,2,0,90.9],["2016-03-15","T20I","NZ","Nagpur","ICC WORLD T20, 2016",null,5,0,7,0,0,71.4],["2016-03-06","T20I","BAN","Dhaka","ASIA CUP, 2016",null,1,0,5,0,0,20],["2016-03-03","T20I","UAE","Dhaka","ASIA CUP, 2016",null,39,0,28,7,1,139.2],["2016-03-01","T20I","SL","Dhaka","ASIA CUP, 2016",null,15,0,14,3,0,107.1],["2016-02-27","T20I","PAK","Dhaka","ASIA CUP, 2016",null,0,0,2,0,0,0],["2016-02-24","T20I","BAN","Dhaka","ASIA CUP, 2016",null,83,0,55,7,3,150.9],["2016-02-14","T20I","SL","Visakhapatnam","SRI LANKA TOUR OF INDIA, 2016",null,13,0,13,1,1,100],["2016-02-12","T20I","SL","Ranchi","SRI LANKA TOUR OF INDIA, 2016",null,43,0,36,2,1,119.4],["2016-02-09","T20I","SL","Pune","SRI LANKA TOUR OF INDIA, 2016",null,0,0,2,0,0,0],["2016-01-31","T20I","AUS","Sydney","INDIA TOUR OF AUSTRALIA, 2016",null,52,0,38,5,1,136.8],["2016-01-29","T20I","AUS","Melbourne","INDIA TOUR OF AUSTRALIA, 2016",null,60,0,47,5,2,127.6],["2016-01-26","T20I","AUS","Adelaide","INDIA TOUR OF AUSTRALIA, 2016",null,31,0,20,4,1,155],["2016-01-23","ODI","AUS","Sydney","INDIA TOUR OF AUSTRALIA, 2016",null,99,0,108,9,1,91.6],["2016-01-20","ODI","AUS","Canberra","INDIA TOUR OF AUSTRALIA, 2016",null,41,0,25,2,3,164],["2016-01-17","ODI","AUS","Melbourne","INDIA TOUR OF AUSTRALIA, 2016",null,6,0,11,0,0,54.5],["2016-01-15","ODI","AUS","Brisbane","INDIA TOUR OF AUSTRALIA, 2016",null,124,0,127,11,3,97.6],["2016-01-12","ODI","AUS","Perth","INDIA TOUR OF AUSTRALIA, 2016",null,171,1,163,13,7,104.9],["2015-12-03","Test","RSA","Delhi","SOUTH AFRICA TOUR OF INDIA, 2015",1,1,0,null,0,0,16.6],["2015-12-03","Test","RSA","Delhi","SOUTH AFRICA TOUR OF INDIA, 2015",2,0,0,null,0,0,0],["2015-11-25","Test","RSA","Nagpur","SOUTH AFRICA TOUR OF INDIA, 2015",1,2,0,null,0,0,7.1],["2015-11-25","Test","RSA","Nagpur","SOUTH AFRICA TOUR OF INDIA, 2015",2,23,0,null,1,1,58.9],["2015-10-25","ODI","RSA","Mumbai","SOUTH AFRICA TOUR OF INDIA, 2015",null,16,0,20,3,0,80],["2015-10-22","ODI","RSA","Chennai","SOUTH AFRICA TOUR OF INDIA, 2015",null,21,0,19,4,0,110.5],["2015-10-18","ODI","RSA","Rajkot","SOUTH AFRICA TOUR OF INDIA, 2015",null,65,0,74,7,2,87.8],["2015-10-14","ODI","RSA","Indore","SOUTH AFRICA TOUR OF INDIA, 2015",null,3,0,10,0,0,30],["2015-10-11","ODI","RSA","Kanpur","SOUTH AFRICA TOUR OF INDIA, 2015",null,150,0,133,13,6,112.7],["2015-10-05","T20I","RSA","Cuttack","SOUTH AFRICA TOUR OF INDIA, 2015",null,22,0,24,2,0,91.6],["2015-10-02","T20I","RSA","Dharamsala","SOUTH AFRICA TOUR OF INDIA, 2015",null,106,0,66,12,5,160.6],["2015-08-28","Test","SL","Colombo","INDIA TOUR OF SRI LANKA, 2015 - CRICBUZZ CUP",1,26,0,null,3,1,40],["2015-08-28","Test","SL","Colombo","INDIA TOUR OF SRI LANKA, 2015 - CRICBUZZ CUP",2,50,0,null,4,1,69.4],["2015-08-20","Test","SL","Colombo","INDIA TOUR OF SRI LANKA, 2015 - CRICBUZZ CUP",1,79,0,null,5,3,59.8],["2015-08-20","Test","SL","Colombo","INDIA TOUR OF SRI LANKA, 2015 - CRICBUZZ CUP",2,34,0,null,2,0,61.8],["2015-08-12","Test","SL","Galle","INDIA TOUR OF SRI LANKA, 2015 - CRICBUZZ CUP",1,9,0,null,1,0,37.5],["2015-08-12","Test","SL","Galle","INDIA TOUR OF SRI LANKA, 2015 - CRICBUZZ CUP",2,4,0,null,1,0,25],["2015-06-24","ODI","BAN","Dhaka","INDIA TOUR OF BANGLADESH, 2015",null,29,0,29,2,1,100],["2015-06-21","ODI","BAN","Dhaka","INDIA TOUR OF BANGLADESH, 2015",null,0,0,2,0,0,0],["2015-06-18","ODI","BAN","Dhaka","INDIA TOUR OF BANGLADESH, 2015",null,63,0,68,4,1,92.6],["2015-06-10","Test","BAN","Fatullah","INDIA TOUR OF BANGLADESH, 2015",1,6,0,null,1,0,66.6],["2015-05-24","IPL","CSK","Kolkata","INDIAN PREMIER LEAGUE 2015",null,50,0,26,6,2,192.3],["2015-05-19","IPL","CSK","Mumbai","INDIAN PREMIER LEAGUE 2015",null,19,0,14,1,1,135.7],["2015-05-17","IPL","SRH","Hyderabad","INDIAN PREMIER LEAGUE 2015",null,7,1,2,0,1,350],["2015-05-14","IPL","KKR","Mumbai","INDIAN PREMIER LEAGUE 2015",null,30,0,21,5,0,142.8],["2015-05-10","IPL","RCB","Mumbai","INDIAN PREMIER LEAGUE 2015",null,15,0,13,1,1,115.3],["2015-05-08","IPL","CSK","Chennai","INDIAN PREMIER LEAGUE 2015",null,18,0,22,0,0,81.8],["2015-05-05","IPL","DC","Mumbai","INDIAN PREMIER LEAGUE 2015",null,46,0,37,2,3,124.3],["2015-05-03","IPL","PBKS","Mohali","INDIAN PREMIER LEAGUE 2015",null,26,0,20,2,0,130],["2015-05-01","IPL","RR","Mumbai","INDIAN PREMIER LEAGUE 2015",null,27,0,21,2,1,128.5],["2015-04-25","IPL","SRH","Mumbai","INDIAN PREMIER LEAGUE 2015",null,24,0,15,2,1,160],["2015-04-23","IPL","DC","Delhi","INDIAN PREMIER LEAGUE 2015",null,30,0,24,0,2,125],["2015-04-19","IPL","RCB","Bengaluru","INDIAN PREMIER LEAGUE 2015",null,42,0,15,3,4,280],["2015-04-17","IPL","CSK","Mumbai","INDIAN PREMIER LEAGUE 2015",null,50,0,31,5,1,161.2],["2015-04-14","IPL","RR","Ahmedabad","INDIAN PREMIER LEAGUE 2015",null,0,0,5,0,0,0],["2015-04-12","IPL","PBKS","Mumbai","INDIAN PREMIER LEAGUE 2015",null,0,0,2,0,0,0],["2015-04-08","IPL","KKR","Kolkata","INDIAN PREMIER LEAGUE 2015",null,98,1,65,12,4,150.7],["2015-03-26","ODI","AUS","Sydney","ICC CRICKET WORLD CUP 2015",null,34,0,48,1,2,70.8],["2015-03-19","ODI","BAN","Melbourne","ICC CRICKET WORLD CUP 2015",null,137,0,126,14,3,108.7],["2015-03-14","ODI","ZIM","Auckland","ICC CRICKET WORLD CUP 2015",null,16,0,21,2,0,76.1],["2015-03-10","ODI","IRE","Hamilton","ICC CRICKET WORLD CUP 2015",null,64,0,66,3,3,96.9],["2015-03-06","ODI","WI","Perth","ICC CRICKET WORLD CUP 2015",null,7,0,18,1,0,38.8],["2015-02-28","ODI","UAE","Perth","ICC CRICKET WORLD CUP 2015",null,57,1,55,10,1,103.6],["2015-02-22","ODI","RSA","Melbourne","ICC CRICKET WORLD CUP 2015",null,0,0,6,0,0,0],["2015-02-15","ODI","PAK","Adelaide","ICC CRICKET WORLD CUP 2015",null,15,0,20,2,0,75],["2015-01-18","ODI","AUS","Melbourne","INDIA AND ENGLAND IN AUSTRALIA TRI-SERIES, 2015",null,138,0,139,9,4,99.2],["2015-01-06","Test","AUS","Sydney","INDIA TOUR OF AUSTRALIA, 2014-15",1,53,0,null,5,2,39.8],["2015-01-06","Test","AUS","Sydney","INDIA TOUR OF AUSTRALIA, 2014-15",2,39,0,null,2,2,43.3],["2014-12-17","Test","AUS","Brisbane","INDIA TOUR OF AUSTRALIA, 2014-15",1,32,0,null,3,1,58.1],["2014-12-17","Test","AUS","Brisbane","INDIA TOUR OF AUSTRALIA, 2014-15",2,0,0,null,0,0,0],["2014-12-09","Test","AUS","Adelaide","INDIA TOUR OF AUSTRALIA, 2014-15",1,43,0,null,5,0,48.3],["2014-12-09","Test","AUS","Adelaide","INDIA TOUR OF AUSTRALIA, 2014-15",2,6,0,null,1,0,33.3],["2014-11-16","ODI","SL","Ranchi","SRI LANKA TOUR OF INDIA, 2014",null,9,0,12,2,0,75],["2014-11-13","ODI","SL","Kolkata","SRI LANKA TOUR OF INDIA, 2014",null,264,0,173,33,9,152.6],["2014-08-27","ODI","ENG","Cardiff","INDIA TOUR OF ENGLAND 2014",null,52,0,87,4,1,59.7],["2014-07-27","Test","ENG","Southampton","INDIA TOUR OF ENGLAND 2014",1,28,0,null,3,0,45.9],["2014-07-27","Test","ENG","Southampton","INDIA TOUR OF ENGLAND 2014",2,6,0,null,0,0,21.4],["2014-05-28","IPL","CSK","Mumbai","INDIAN PREMIER LEAGUE 2014",null,20,0,16,3,0,125],["2014-05-25","IPL","RR","Mumbai","INDIAN PREMIER LEAGUE 2014",null,16,0,11,1,1,145.4],["2014-05-23","IPL","DC","Mumbai","INDIAN PREMIER LEAGUE 2014",null,30,0,21,4,0,142.8],["2014-05-21","IPL","PBKS","Mohali","INDIAN PREMIER LEAGUE 2014",null,18,0,20,2,0,90],["2014-05-19","IPL","RR","Ahmedabad","INDIAN PREMIER LEAGUE 2014",null,40,0,19,3,4,210.5],["2014-05-14","IPL","KKR","Cuttack","INDIAN PREMIER LEAGUE 2014",null,51,0,45,4,2,113.3],["2014-05-14","IPL","SRH","Hyderabad","INDIAN PREMIER LEAGUE 2014",null,14,1,6,3,0,233.3],["2014-05-10","IPL","CSK","Mumbai","INDIAN PREMIER LEAGUE 2014",null,19,0,19,1,0,100],["2014-05-06","IPL","RCB","Mumbai","INDIAN PREMIER LEAGUE 2014",null,59,1,35,3,4,168.5],["2014-05-03","IPL","PBKS","Mumbai","INDIAN PREMIER LEAGUE 2014",null,39,0,34,4,2,114.7],["2014-04-30","IPL","SRH","Dubai","INDIAN PREMIER LEAGUE 2014",null,1,0,5,0,0,20],["2014-04-27","IPL","DC","Sharjah","INDIAN PREMIER LEAGUE 2014",null,4,0,5,0,0,80],["2014-04-25","IPL","CSK","Dubai","INDIAN PREMIER LEAGUE 2014",null,50,0,41,3,2,121.9],["2014-04-19","IPL","RCB","Dubai","INDIAN PREMIER LEAGUE 2014",null,2,0,5,0,0,40],["2014-04-16","IPL","KKR","Abu Dhabi","INDIAN PREMIER LEAGUE 2014",null,27,0,20,0,1,135],["2014-04-06","T20I","SL","Dhaka","ICC WORLD TWENTY20 2014",null,29,0,26,3,0,111.5],["2014-04-04","T20I","RSA","Dhaka","ICC WORLD TWENTY20 2014",null,24,0,13,4,1,184.6],["2014-03-30","T20I","AUS","Dhaka","ICC WORLD TWENTY20 2014",null,5,0,3,1,0,166.6],["2014-03-28","T20I","BAN","Dhaka","ICC WORLD TWENTY20 2014",null,56,0,44,5,1,127.2],["2014-03-23","T20I","WI","Dhaka","ICC WORLD TWENTY20 2014",null,62,1,55,5,2,112.7],["2014-03-21","T20I","PAK","Dhaka","ICC WORLD TWENTY20 2014",null,24,0,21,1,2,114.2],["2014-03-05","ODI","AFG","Dhaka","ASIA CUP, 2014",null,18,1,24,1,0,75],["2014-03-02","ODI","PAK","Dhaka","ASIA CUP, 2014",null,56,0,58,7,2,96.5],["2014-02-28","ODI","SL","Fatullah","ASIA CUP, 2014",null,13,0,28,1,0,46.4],["2014-02-26","ODI","BAN","Fatullah","ASIA CUP, 2014",null,21,0,29,1,1,72.4],["2014-02-14","Test","NZ","Wellington","INDIA TOUR OF NEW ZEALAND 2014",1,0,0,null,0,0,0],["2014-02-14","Test","NZ","Wellington","INDIA TOUR OF NEW ZEALAND 2014",2,31,1,null,4,0,31.9],["2014-02-06","Test","NZ","Auckland","INDIA TOUR OF NEW ZEALAND 2014",1,72,0,null,8,1,60],["2014-02-06","Test","NZ","Auckland","INDIA TOUR OF NEW ZEALAND 2014",2,19,0,null,2,0,32.2],["2014-01-31","ODI","NZ","Wellington","INDIA TOUR OF NEW ZEALAND 2014",null,4,0,13,0,0,30.7],["2014-01-28","ODI","NZ","Hamilton","INDIA TOUR OF NEW ZEALAND 2014",null,79,0,94,6,4,84],["2014-01-25","ODI","NZ","Auckland","INDIA TOUR OF NEW ZEALAND 2014",null,39,0,38,1,4,102.6],["2014-01-22","ODI","NZ","Hamilton","INDIA TOUR OF NEW ZEALAND 2014",null,20,0,34,2,1,58.8],["2014-01-19","ODI","NZ","Napier","INDIA TOUR OF NEW ZEALAND 2014",null,3,0,23,0,0,13],["2013-12-26","Test","RSA","Durban","INDIA IN SOUTH AFRICA 2013",1,0,0,null,0,0,0],["2013-12-26","Test","RSA","Durban","INDIA IN SOUTH AFRICA 2013",2,25,0,null,2,1,54.3],["2013-12-18","Test","RSA","Johannesburg","INDIA IN SOUTH AFRICA 2013",1,14,0,null,1,0,33.3],["2013-12-18","Test","RSA","Johannesburg","INDIA IN SOUTH AFRICA 2013",2,6,0,null,1,0,46.1],["2013-12-08","ODI","RSA","Durban","INDIA IN SOUTH AFRICA 2013",null,19,0,26,2,0,73],["2013-12-05","ODI","RSA","Johannesburg","INDIA IN SOUTH AFRICA 2013",null,18,0,43,2,0,41.8],["2013-11-27","ODI","WI","Kanpur","WEST INDIES IN INDIA 2013",null,4,0,14,0,0,28.5],["2013-11-24","ODI","WI","Visakhapatnam","WEST INDIES IN INDIA 2013",null,12,0,19,3,0,63.1],["2013-11-21","ODI","WI","Kochi","WEST INDIES IN INDIA 2013",null,72,0,81,8,1,88.8],["2013-11-14","Test","WI","Mumbai","WEST INDIES IN INDIA 2013",1,111,1,null,11,3,87.4],["2013-11-06","Test","WI","Kolkata","WEST INDIES IN INDIA 2013",1,177,0,null,23,1,58.8],["2013-11-02","ODI","AUS","Bengaluru","AUSTRALIA TOUR OF INDIA 2013",null,209,0,158,12,16,132.2],["2013-10-30","ODI","AUS","Nagpur","AUSTRALIA TOUR OF INDIA 2013",null,79,0,89,7,3,88.7],["2013-10-23","ODI","AUS","Ranchi","AUSTRALIA TOUR OF INDIA 2013",null,9,1,13,1,0,69.2],["2013-10-19","ODI","AUS","Mohali","AUSTRALIA TOUR OF INDIA 2013",null,11,0,22,2,0,50],["2013-10-16","ODI","AUS","Jaipur","AUSTRALIA TOUR OF INDIA 2013",null,141,1,123,17,4,114.6],["2013-10-13","ODI","AUS","Pune","AUSTRALIA TOUR OF INDIA 2013",null,42,0,47,6,0,89.3],["2013-10-10","T20I","AUS","Rajkot","AUSTRALIA TOUR OF INDIA 2013",null,8,0,8,0,1,100],["2013-08-01","ODI","ZIM","Bulawayo","INDIA TOUR OF ZIMBABWE 2013",null,64,1,90,5,1,71.1],["2013-07-28","ODI","ZIM","Harare","INDIA TOUR OF ZIMBABWE 2013",null,14,0,21,2,0,66.6],["2013-07-26","ODI","ZIM","Harare","INDIA TOUR OF ZIMBABWE 2013",null,1,0,7,0,0,14.2],["2013-07-24","ODI","ZIM","Harare","INDIA TOUR OF ZIMBABWE 2013",null,20,0,40,2,0,50],["2013-07-11","ODI","SL","Port of Spain, Trinidad","INDIA AND SRI LANKA IN WEST INDIES TRI-SERIES 2013",null,58,0,89,5,1,65.1],["2013-07-09","ODI","SL","Port of Spain, Trinidad","INDIA AND SRI LANKA IN WEST INDIES TRI-SERIES 2013",null,48,1,83,2,1,57.8],["2013-07-05","ODI","WI","Port of Spain, Trinidad","INDIA AND SRI LANKA IN WEST INDIES TRI-SERIES 2013",null,46,0,78,5,0,58.9],["2013-07-02","ODI","SL","Kingston, Jamaica","INDIA AND SRI LANKA IN WEST INDIES TRI-SERIES 2013",null,5,0,13,0,0,38.4],["2013-06-30","ODI","WI","Kingston, Jamaica","INDIA AND SRI LANKA IN WEST INDIES TRI-SERIES 2013",null,60,0,89,4,1,67.4],["2013-06-23","ODI","ENG","Birmingham","ICC CHAMPIONS TROPHY 2013",null,9,0,14,1,0,64.2],["2013-06-20","ODI","SL","Cardiff","ICC CHAMPIONS TROPHY 2013",null,33,0,50,4,0,66],["2013-06-15","ODI","PAK","Birmingham","ICC CHAMPIONS TROPHY 2013",null,18,0,32,2,0,56.2],["2013-06-11","ODI","WI","London","ICC CHAMPIONS TROPHY 2013",null,52,0,56,7,0,92.8],["2013-06-06","ODI","RSA","Cardiff","ICC CHAMPIONS TROPHY 2013",null,65,0,81,8,1,80.2],["2013-05-26","IPL","CSK","Kolkata","INDIAN PREMIER LEAGUE 2013",null,2,0,5,0,0,40],["2013-05-24","IPL","RR","Kolkata","INDIAN PREMIER LEAGUE 2013",null,2,0,8,0,0,25],["2013-05-21","IPL","CSK","Delhi","INDIAN PREMIER LEAGUE 2013",null,8,0,15,0,0,53.3],["2013-05-18","IPL","PBKS","Dharamsala","INDIAN PREMIER LEAGUE 2013",null,25,0,25,2,1,100],["2013-05-15","IPL","RR","Mumbai","INDIAN PREMIER LEAGUE 2013",null,14,0,9,2,0,155.5],["2013-05-13","IPL","SRH","Mumbai","INDIAN PREMIER LEAGUE 2013",null,20,1,15,0,2,133.3],["2013-05-11","IPL","PWI","Pune","INDIAN PREMIER LEAGUE 2013",null,37,0,41,3,0,90.2],["2013-05-07","IPL","KKR","Mumbai","INDIAN PREMIER LEAGUE 2013",null,16,0,11,1,1,145.4],["2013-05-05","IPL","CSK","Mumbai","INDIAN PREMIER LEAGUE 2013",null,39,1,30,3,1,130],["2013-05-01","IPL","SRH","Hyderabad","INDIAN PREMIER LEAGUE 2013",null,22,0,22,2,0,100],["2013-04-29","IPL","PBKS","Mumbai","INDIAN PREMIER LEAGUE 2013",null,79,1,39,6,6,202.5],["2013-04-27","IPL","RCB","Mumbai","INDIAN PREMIER LEAGUE 2013",null,10,0,8,1,0,125],["2013-04-24","IPL","KKR","Kolkata","INDIAN PREMIER LEAGUE 2013",null,34,0,28,1,2,121.4],["2013-04-21","IPL","DC","Delhi","INDIAN PREMIER LEAGUE 2013",null,73,0,43,5,5,169.7],["2013-04-17","IPL","RR","Jaipur","INDIAN PREMIER LEAGUE 2013",null,2,0,7,0,0,28.5],["2013-04-13","IPL","PWI","Mumbai","INDIAN PREMIER LEAGUE 2013",null,62,1,32,3,5,193.7],["2013-04-09","IPL","DC","Mumbai","INDIAN PREMIER LEAGUE 2013",null,74,1,50,4,5,148],["2013-04-06","IPL","CSK","Chennai","INDIAN PREMIER LEAGUE 2013",null,8,0,10,1,0,80],["2013-04-04","IPL","RCB","Bengaluru","INDIAN PREMIER LEAGUE 2013",null,11,0,11,1,0,100],["2013-01-27","ODI","ENG","Dharamsala","ENGLAND TOUR OF INDIA 2012-13",null,4,0,9,1,0,44.4],["2013-01-23","ODI","ENG","Mohali","ENGLAND TOUR OF INDIA 2012-13",null,83,0,93,11,1,89.2],["2012-12-30","ODI","PAK","Chennai","PAKISTAN IN INDIA 2012-13",null,4,0,14,0,0,28.5],["2012-12-28","T20I","PAK","Ahmedabad","PAKISTAN IN INDIA 2012-13",null,4,1,2,1,0,200],["2012-12-25","T20I","PAK","Bengaluru","PAKISTAN IN INDIA 2012-13",null,2,0,2,0,0,100],["2012-12-22","T20I","ENG","Mumbai","ENGLAND TOUR OF INDIA 2012-13",null,24,0,19,1,1,126.3],["2012-10-02","T20I","RSA","Colombo","ICC WORLD T20 2012",null,25,0,27,2,0,92.5],["2012-09-28","T20I","AUS","Colombo","ICC WORLD T20 2012",null,1,0,2,0,0,50],["2012-09-23","T20I","ENG","Colombo","ICC WORLD T20 2012",null,55,1,33,5,1,166.6],["2012-09-19","T20I","AFG","Colombo","ICC WORLD T20 2012",null,1,1,1,0,0,100],["2012-09-11","T20I","NZ","Chennai","NEW ZEALAND TOUR OF INDIA, 2012",null,4,1,2,0,0,200],["2012-08-04","ODI","SL","Pallekele","INDIA TOUR OF SRI LANKA, 2012",null,4,0,9,1,0,44.4],["2012-07-31","ODI","SL","Colombo","INDIA TOUR OF SRI LANKA, 2012",null,4,0,14,0,0,28.5],["2012-07-28","ODI","SL","Colombo","INDIA TOUR OF SRI LANKA, 2012",null,0,0,1,0,0,0],["2012-07-24","ODI","SL","Hambantota","INDIA TOUR OF SRI LANKA, 2012",null,0,0,5,0,0,0],["2012-07-21","ODI","SL","Hambantota","INDIA TOUR OF SRI LANKA, 2012",null,5,0,8,0,0,62.5],["2012-05-23","IPL","CSK","Bengaluru","INDIAN PREMIER LEAGUE 2012",null,14,0,19,0,0,73.6],["2012-05-16","IPL","KKR","Mumbai","INDIAN PREMIER LEAGUE 2012",null,12,0,14,1,0,85.7],["2012-05-14","IPL","RCB","Bengaluru","INDIAN PREMIER LEAGUE 2012",null,5,0,7,1,0,71.4],["2012-05-12","IPL","KKR","Kolkata","INDIAN PREMIER LEAGUE 2012",null,109,1,60,12,5,181.6],["2012-05-09","IPL","RCB","Mumbai","INDIAN PREMIER LEAGUE 2012",null,0,0,3,0,0,0],["2012-05-06","IPL","CSK","Mumbai","INDIAN PREMIER LEAGUE 2012",null,60,0,46,6,2,130.4],["2012-05-03","IPL","PWI","Pune","INDIAN PREMIER LEAGUE 2012",null,3,0,5,0,0,60],["2012-04-29","IPL","DCG","Mumbai","INDIAN PREMIER LEAGUE 2012",null,42,0,48,4,1,87.5],["2012-04-27","IPL","DC","Delhi","INDIAN PREMIER LEAGUE 2012",null,12,0,6,1,1,200],["2012-04-25","IPL","PBKS","Mohali","INDIAN PREMIER LEAGUE 2012",null,50,0,30,3,3,166.6],["2012-04-22","IPL","PBKS","Mumbai","INDIAN PREMIER LEAGUE 2012",null,2,0,5,0,0,40],["2012-04-16","IPL","DC","Mumbai","INDIAN PREMIER LEAGUE 2012",null,29,0,27,5,0,107.4],["2012-04-11","IPL","RR","Mumbai","INDIAN PREMIER LEAGUE 2012",null,21,0,13,2,1,161.5],["2012-04-09","IPL","DCG","Visakhapatnam","INDIAN PREMIER LEAGUE 2012",null,73,1,50,4,5,146],["2012-04-06","IPL","PWI","Mumbai","INDIAN PREMIER LEAGUE 2012",null,1,0,6,0,0,16.6],["2012-04-04","IPL","CSK","Chennai","INDIAN PREMIER LEAGUE 2012",null,0,0,3,0,0,0],["2012-03-18","ODI","PAK","Dhaka","ASIA CUP, 2012",null,68,0,83,5,1,81.9],["2012-03-16","ODI","BAN","Dhaka","ASIA CUP, 2012",null,4,0,6,0,0,66.6],["2012-02-19","ODI","AUS","Brisbane","INDIA AND SRI LANKA IN AUSTRALIA TRI-SERIES 2012",null,0,0,5,0,0,0],["2012-02-14","ODI","SL","Adelaide","INDIA AND SRI LANKA IN AUSTRALIA TRI-SERIES 2012",null,15,0,27,2,0,55.5],["2012-02-12","ODI","AUS","Adelaide","INDIA AND SRI LANKA IN AUSTRALIA TRI-SERIES 2012",null,33,0,41,1,1,80.4],["2012-02-08","ODI","SL","Perth","INDIA AND SRI LANKA IN AUSTRALIA TRI-SERIES 2012",null,10,0,17,1,0,58.8],["2012-02-05","ODI","AUS","Melbourne","INDIA AND SRI LANKA IN AUSTRALIA TRI-SERIES 2012",null,21,0,21,2,0,100],["2012-02-01","T20I","AUS","Homebush Bay, Sydney","INDIA IN AUSTRALIA T20I SERIES 2012",null,0,0,1,0,0,0],["2011-12-11","ODI","WI","Chennai","WEST INDIES IN INDIA 2011",null,21,0,26,1,0,80.7],["2011-12-08","ODI","WI","Indore","WEST INDIES IN INDIA 2011",null,27,0,16,3,0,168.7],["2011-12-05","ODI","WI","Ahmedabad","WEST INDIES IN INDIA 2011",null,95,0,100,10,1,95],["2011-12-02","ODI","WI","Visakhapatnam","WEST INDIES IN INDIA 2011",null,90,1,98,7,2,91.8],["2011-11-29","ODI","WI","Cuttack","WEST INDIES IN INDIA 2011",null,72,0,99,3,1,72.7],["2011-09-03","ODI","ENG","Chester-le-Street","INDIA IN ENGLAND, 2011",null,0,1,1,0,0,0],["2011-08-31","T20I","ENG","Manchester","INDIA IN ENGLAND, 2011",null,1,0,3,0,0,33.3],["2011-06-16","ODI","WI","Kingston, Jamaica","INDIA IN WEST INDIES, 2011",null,57,0,72,2,1,79.1],["2011-06-13","ODI","WI","North Sound, Antigua","INDIA IN WEST INDIES, 2011",null,39,0,47,0,1,82.9],["2011-06-11","ODI","WI","North Sound, Antigua","INDIA IN WEST INDIES, 2011",null,86,1,91,5,2,94.5],["2011-06-08","ODI","WI","Port of Spain, Trinidad","INDIA IN WEST INDIES, 2011",null,7,1,14,1,0,50],["2011-06-06","ODI","WI","Port of Spain, Trinidad","INDIA IN WEST INDIES, 2011",null,68,1,75,3,1,90.6],["2011-06-04","T20I","WI","Port of Spain, Trinidad","INDIA IN WEST INDIES, 2011",null,26,0,23,null,null,null],["2011-05-27","IPL","RCB","Chennai","INDIAN PREMIER LEAGUE 2011",null,13,0,15,1,0,86.6],["2011-05-22","IPL","KKR","Kolkata","INDIAN PREMIER LEAGUE 2011",null,10,0,9,1,0,111.1],["2011-05-20","IPL","RR","Mumbai","INDIAN PREMIER LEAGUE 2011",null,58,0,47,5,1,123.4],["2011-05-14","IPL","DCG","Mumbai","INDIAN PREMIER LEAGUE 2011",null,4,0,6,1,0,66.6],["2011-05-10","IPL","PBKS","Mohali","INDIAN PREMIER LEAGUE 2011",null,5,0,5,1,0,100],["2011-05-07","IPL","DC","Mumbai","INDIAN PREMIER LEAGUE 2011",null,49,0,32,2,3,153.1],["2011-05-04","IPL","PWI","Navi Mumbai","INDIAN PREMIER LEAGUE 2011",null,12,0,20,0,0,60],["2011-05-02","IPL","PBKS","Mumbai","INDIAN PREMIER LEAGUE 2011",null,18,0,11,3,0,163.6],["2011-04-29","IPL","RR","Jaipur","INDIAN PREMIER LEAGUE 2011",null,13,0,22,1,0,59],["2011-04-24","IPL","DCG","Hyderabad","INDIAN PREMIER LEAGUE 2011",null,56,1,34,5,3,164.7],["2011-04-22","IPL","CSK","Mumbai","INDIAN PREMIER LEAGUE 2011",null,87,0,48,8,5,181.2],["2011-04-20","IPL","PWI","Mumbai","INDIAN PREMIER LEAGUE 2011",null,20,1,18,1,1,111.1],["2011-04-10","IPL","DC","Delhi","INDIAN PREMIER LEAGUE 2011",null,27,1,30,3,0,90],["2011-01-23","ODI","RSA","Centurion","INDIA IN SOUTH AFRICA, 2010-11",null,5,0,8,1,0,62.5],["2011-01-21","ODI","RSA","Gqeberha","INDIA IN SOUTH AFRICA, 2010-11",null,1,0,6,0,0,16.6],["2011-01-18","ODI","RSA","Cape Town","INDIA IN SOUTH AFRICA, 2010-11",null,23,0,45,2,0,51.1],["2011-01-15","ODI","RSA","Johannesburg","INDIA IN SOUTH AFRICA, 2010-11",null,9,0,14,1,0,64.2],["2011-01-12","ODI","RSA","Durban","INDIA IN SOUTH AFRICA, 2010-11",null,11,0,27,1,0,40.7],["2011-01-09","T20I","RSA","Durban","INDIA IN SOUTH AFRICA, 2010-11",null,53,0,34,5,2,155.8],["2010-12-07","ODI","NZ","Bengaluru","NEW ZEALAND IN INDIA, 2010",null,44,0,48,4,1,91.6],["2010-08-28","ODI","SL","Dambulla","TRI-SERIES IN SRI LANKA, 2010",null,5,0,9,0,0,55.5],["2010-08-22","ODI","SL","Dambulla","TRI-SERIES IN SRI LANKA, 2010",null,11,0,21,2,0,52.3],["2010-08-16","ODI","SL","Dambulla","TRI-SERIES IN SRI LANKA, 2010",null,0,0,2,0,0,0],["2010-08-10","ODI","NZ","Dambulla","TRI-SERIES IN SRI LANKA, 2010",null,4,0,11,0,0,36.3],["2010-06-24","ODI","SL","Dambulla","ASIA CUP, 2010",null,41,0,52,3,0,78.8],["2010-06-22","ODI","SL","Dambulla","ASIA CUP, 2010",null,69,0,73,7,0,94.5],["2010-06-19","ODI","PAK","Dambulla","ASIA CUP, 2010",null,22,0,24,2,0,91.6],["2010-06-16","ODI","BAN","Dambulla","ASIA CUP, 2010",null,0,0,1,0,0,0],["2010-06-12","T20I","ZIM","Harare","ZIMBABWE V INDIA T20I SERIES, 2010",null,10,0,15,1,0,66.6],["2010-06-05","ODI","SL","Harare","TRI-SERIES IN ZIMBABWE, 2010",null,32,0,40,1,0,80],["2010-06-03","ODI","ZIM","Harare","TRI-SERIES IN ZIMBABWE, 2010",null,13,0,25,0,0,52],["2010-05-30","ODI","SL","Bulawayo","TRI-SERIES IN ZIMBABWE, 2010",null,101,0,100,6,2,101],["2010-05-28","ODI","ZIM","Bulawayo","TRI-SERIES IN ZIMBABWE, 2010",null,114,0,119,6,4,95.8],["2010-05-09","T20I","WI","Bridgetown, Barbados","ICC WORLD T20, 2010",null,5,0,8,1,0,62.5],["2010-05-07","T20I","AUS","Bridgetown, Barbados","ICC WORLD T20, 2010",null,79,1,46,4,6,171.7],["2010-04-24","IPL","RCB","Navi Mumbai","INDIAN PREMIER LEAGUE 2010",null,0,0,4,0,0,0],["2010-04-22","IPL","CSK","Navi Mumbai","INDIAN PREMIER LEAGUE 2010",null,2,0,5,0,0,40],["2010-04-18","IPL","DC","Delhi","INDIAN PREMIER LEAGUE 2010",null,11,0,9,2,0,122.2],["2010-04-16","IPL","PBKS","Dharamsala","INDIAN PREMIER LEAGUE 2010",null,68,1,38,6,3,178.9],["2010-04-12","IPL","RCB","Nagpur","INDIAN PREMIER LEAGUE 2010",null,51,0,46,7,0,110.8],["2010-04-10","IPL","CSK","Nagpur","INDIAN PREMIER LEAGUE 2010",null,8,0,15,0,0,53.3],["2010-04-08","IPL","RCB","Bengaluru","INDIAN PREMIER LEAGUE 2010",null,6,0,5,1,0,120],["2010-04-05","IPL","RR","Nagpur","INDIAN PREMIER LEAGUE 2010",null,73,0,44,8,2,165.9],["2010-04-03","IPL","MI","Mumbai","INDIAN PREMIER LEAGUE 2010",null,11,0,13,0,0,84.6],["2010-04-01","IPL","KKR","Kolkata","INDIAN PREMIER LEAGUE 2010",null,2,0,6,0,0,33.3],["2010-03-28","IPL","MI","Navi Mumbai","INDIAN PREMIER LEAGUE 2010",null,45,0,28,3,2,160.7],["2010-03-26","IPL","RR","Ahmedabad","INDIAN PREMIER LEAGUE 2010",null,49,0,35,2,3,140],["2010-03-21","IPL","DC","Cuttack","INDIAN PREMIER LEAGUE 2010",null,45,0,30,3,3,150],["2010-03-19","IPL","PBKS","Cuttack","INDIAN PREMIER LEAGUE 2010",null,1,0,2,0,0,50],["2010-03-14","IPL","CSK","Chennai","INDIAN PREMIER LEAGUE 2010",null,19,1,10,2,1,190],["2010-03-12","IPL","KKR","Navi Mumbai","INDIAN PREMIER LEAGUE 2010",null,13,0,12,2,0,108.3],["2010-02-27","ODI","RSA","Ahmedabad","SOUTH AFRICA IN INDIA ODI SERIES, 2010",null,48,0,61,3,0,78.6],["2009-12-09","T20I","SL","Nagpur","SRI LANKA IN INDIA T20I SERIES, 2009",null,3,0,4,0,0,75],["2009-07-03","ODI","WI","Gros Islet, St Lucia","INDIA IN WEST INDIES ODI SERIES",null,11,0,9,0,0,122.2],["2009-06-28","ODI","WI","Kingston, Jamaica","INDIA IN WEST INDIES ODI SERIES",null,0,0,2,0,0,0],["2009-06-26","ODI","WI","Kingston, Jamaica","INDIA IN WEST INDIES ODI SERIES",null,4,0,12,0,0,33.3],["2009-06-16","T20I","RSA","Nottingham","ICC WORLD T20, 2009",null,29,0,28,3,0,103.5],["2009-06-14","T20I","ENG","London","ICC WORLD T20, 2009",null,9,0,8,1,0,112.5],["2009-06-12","T20I","WI","London","ICC WORLD T20, 2009",null,5,0,3,1,0,166.6],["2009-06-10","T20I","IRE","Nottingham","ICC WORLD T20, 2009",null,52,1,45,4,1,115.5],["2009-06-06","T20I","BAN","Nottingham","ICC WORLD T20, 2009",null,36,0,23,3,2,156.5],["2009-05-24","IPL","RCB","Johannesburg","INDIAN PREMIER LEAGUE 2009",null,24,0,23,1,1,104.3],["2009-05-22","IPL","DC","Centurion","INDIAN PREMIER LEAGUE 2009",null,5,1,11,0,0,45.4],["2009-05-21","IPL","RCB","Centurion","INDIAN PREMIER LEAGUE 2009",null,12,0,12,1,0,100],["2009-05-17","IPL","PBKS","Johannesburg","INDIAN PREMIER LEAGUE 2009",null,42,0,26,3,3,161.5],["2009-05-16","IPL","KKR","Johannesburg","INDIAN PREMIER LEAGUE 2009",null,32,1,13,3,2,246.1],["2009-05-13","IPL","DC","Durban","INDIAN PREMIER LEAGUE 2009",null,6,0,7,1,0,85.7],["2009-05-11","IPL","RR","Kimberley","INDIAN PREMIER LEAGUE 2009",null,9,0,14,0,0,64.2],["2009-05-09","IPL","PBKS","Kimberley","INDIAN PREMIER LEAGUE 2009",null,9,0,15,1,0,60],["2009-05-06","IPL","MI","Centurion","INDIAN PREMIER LEAGUE 2009",null,38,0,36,2,1,105.5],["2009-05-04","IPL","CSK","East London","INDIAN PREMIER LEAGUE 2009",null,21,0,20,2,1,105],["2009-05-02","IPL","RR","Gqeberha","INDIAN PREMIER LEAGUE 2009",null,38,0,32,2,2,118.7],["2009-04-30","IPL","DC","Centurion","INDIAN PREMIER LEAGUE 2009",null,17,0,20,2,0,85],["2009-04-27","IPL","CSK","Durban","INDIAN PREMIER LEAGUE 2009",null,18,0,19,0,1,94.7],["2009-04-25","IPL","MI","Durban","INDIAN PREMIER LEAGUE 2009",null,3,0,5,0,0,60],["2009-04-22","IPL","RCB","Cape Town","INDIAN PREMIER LEAGUE 2009",null,52,0,30,1,5,173.3],["2009-04-19","IPL","KKR","Cape Town","INDIAN PREMIER LEAGUE 2009",null,36,1,32,3,2,112.5],["2009-03-14","ODI","NZ","Auckland","INDIA IN NEW ZEALAND ODI SERIES",null,43,1,74,1,1,58.1],["2009-02-25","T20I","NZ","Christchurch","INDIA IN NEW ZEALAND T20I SERIES, 2009",null,7,0,7,0,1,100],["2009-02-10","T20I","SL","Colombo","INDIA IN SRI LANKA T20I MATCH, 2009",null,4,0,11,0,0,36.3],["2009-02-08","ODI","SL","Colombo","INDIA IN SRI LANKA ODI SERIES",null,15,0,22,1,0,68.1],["2009-02-05","ODI","SL","Colombo","INDIA IN SRI LANKA ODI SERIES",null,4,1,6,0,0,66.6],["2009-01-28","ODI","SL","Dambulla","INDIA IN SRI LANKA ODI SERIES",null,25,1,30,3,0,83.3],["2008-11-26","ODI","ENG","Cuttack","ENGLAND IN INDIA ODI SERIES",null,8,1,10,1,0,80],["2008-11-20","ODI","ENG","Kanpur","ENGLAND IN INDIA ODI SERIES",null,28,0,41,3,0,68.2],["2008-11-17","ODI","ENG","Indore","ENGLAND IN INDIA ODI SERIES",null,3,0,13,0,0,23],["2008-11-14","ODI","ENG","Rajkot","ENGLAND IN INDIA ODI SERIES",null,11,1,8,1,0,137.5],["2008-08-29","ODI","SL","Colombo","INDIA IN SRI LANKA ODI SERIES",null,3,0,5,0,0,60],["2008-08-27","ODI","SL","Colombo","INDIA IN SRI LANKA ODI SERIES",null,18,0,23,0,0,78.2],["2008-08-24","ODI","SL","Colombo","INDIA IN SRI LANKA ODI SERIES",null,32,0,32,3,0,100],["2008-08-20","ODI","SL","Dambulla","INDIA IN SRI LANKA ODI SERIES",null,0,0,2,0,0,0],["2008-08-18","ODI","SL","Dambulla","INDIA IN SRI LANKA ODI SERIES",null,19,0,31,1,1,61.2],["2008-07-06","ODI","SL","Karachi","ASIA CUP, 2008",null,3,0,8,0,0,37.5],["2008-07-03","ODI","SL","Karachi","ASIA CUP, 2008",null,22,1,28,2,0,78.5],["2008-07-02","ODI","PAK","Karachi","ASIA CUP, 2008",null,58,0,71,4,0,81.6],["2008-06-28","ODI","BAN","Karachi","ASIA CUP, 2008",null,22,0,23,2,0,95.6],["2008-06-26","ODI","PAK","Karachi","ASIA CUP, 2008",null,0,1,1,0,0,0],["2008-06-25","ODI","HKC","Karachi","ASIA CUP, 2008",null,11,0,29,0,0,37.9],["2008-06-14","ODI","PAK","Dhaka","BANGLADESH, INDIA, PAKISTAN IN BANGLADESH",null,24,0,27,5,0,88.8],["2008-06-12","ODI","BAN","Dhaka","BANGLADESH, INDIA, PAKISTAN IN BANGLADESH",null,26,0,43,1,1,60.4],["2008-06-10","ODI","PAK","Dhaka","BANGLADESH, INDIA, PAKISTAN IN BANGLADESH",null,9,0,27,0,0,33.3],["2008-05-23","IPL","PBKS","Mohali","INDIAN PREMIER LEAGUE 2008",null,50,0,27,3,4,185.1],["2008-05-18","IPL","MI","Hyderabad","INDIAN PREMIER LEAGUE 2008",null,6,0,10,1,0,60],["2008-05-15","IPL","DC","Delhi","INDIAN PREMIER LEAGUE 2008",null,35,0,18,3,2,194.4],["2008-05-11","IPL","KKR","Hyderabad","INDIAN PREMIER LEAGUE 2008",null,33,0,24,3,2,137.5],["2008-05-09","IPL","RR","Jaipur","INDIAN PREMIER LEAGUE 2008",null,5,0,8,0,0,62.5],["2008-05-06","IPL","CSK","Chennai","INDIAN PREMIER LEAGUE 2008",null,23,0,17,2,1,135.2],["2008-05-03","IPL","RCB","Bengaluru","INDIAN PREMIER LEAGUE 2008",null,57,0,42,5,3,135.7],["2008-05-01","IPL","PBKS","Hyderabad","INDIAN PREMIER LEAGUE 2008",null,76,1,42,10,2,180.9],["2008-04-24","IPL","RR","Hyderabad","INDIAN PREMIER LEAGUE 2008",null,36,0,30,3,1,120],["2008-04-22","IPL","DC","Hyderabad","INDIAN PREMIER LEAGUE 2008",null,66,0,36,6,4,183.3],["2008-04-20","IPL","KKR","Kolkata","INDIAN PREMIER LEAGUE 2008",null,0,0,3,0,0,0],["2008-03-04","ODI","AUS","Brisbane","AUSTRALIA, INDIA, SRI LANKA IN AUSTRALIA",null,2,0,5,0,0,40],["2008-03-02","ODI","AUS","Sydney","AUSTRALIA, INDIA, SRI LANKA IN AUSTRALIA",null,66,0,87,6,0,75.8],["2008-02-26","ODI","SL","Hobart","AUSTRALIA, INDIA, SRI LANKA IN AUSTRALIA",null,3,1,7,0,0,42.8],["2008-02-24","ODI","AUS","Sydney","AUSTRALIA, INDIA, SRI LANKA IN AUSTRALIA",null,1,0,3,0,0,33.3],["2008-02-19","ODI","SL","Adelaide","AUSTRALIA, INDIA, SRI LANKA IN AUSTRALIA",null,24,0,36,1,0,66.6],["2008-02-17","ODI","AUS","Adelaide","AUSTRALIA, INDIA, SRI LANKA IN AUSTRALIA",null,1,0,3,0,0,33.3],["2008-02-12","ODI","SL","Canberra","AUSTRALIA, INDIA, SRI LANKA IN AUSTRALIA",null,70,1,64,6,1,109.3],["2008-02-10","ODI","AUS","Melbourne","AUSTRALIA, INDIA, SRI LANKA IN AUSTRALIA",null,39,1,61,2,0,63.9],["2008-02-05","ODI","SL","Brisbane","AUSTRALIA, INDIA, SRI LANKA IN AUSTRALIA",null,0,0,2,0,0,0],["2008-02-03","ODI","AUS","Brisbane","AUSTRALIA, INDIA, SRI LANKA IN AUSTRALIA",null,29,0,43,5,0,67.4],["2008-02-01","T20I","AUS","Melbourne","INDIA IN AUSTRALIA T20I MATCH, 2008",null,8,0,8,1,0,100],["2007-11-18","ODI","PAK","Jaipur","PAKISTAN IN INDIA ODI SERIES",null,52,0,61,3,1,85.2],["2007-10-05","ODI","AUS","Hyderabad","AUSTRALIA IN INDIA ODI SERIES",null,1,0,4,0,0,25],["2007-09-24","T20I","PAK","Johannesburg","ICC WORLD T20, 2007",null,30,1,16,2,1,187.5],["2007-09-22","T20I","AUS","Durban","ICC WORLD T20, 2007",null,8,1,5,0,1,160],["2007-09-20","T20I","RSA","Durban","ICC WORLD T20, 2007",null,50,1,40,7,2,125],["2007-06-26","ODI","RSA","Belfast","INDIA, SOUTH AFRICA IN IRELAND, 2007",null,8,0,9,0,0,88.8]];

const BATTING = BAT_ROWS.map((r) => {
  const o = {};
  BAT_COLS.forEach((k, i) => (o[k] = r[i]));
  o.notOut = !!o.notOut;
  o.year = o.date.slice(0, 4);
  return o;
});

/* In-India venues (everything else counts as Overseas) */
const HOME = new Set(["Ahmedabad", "Bengaluru", "Chennai", "Cuttack", "Delhi", "Dharamsala", "Guwahati", "Hyderabad", "Indore", "Jaipur", "Kanpur", "Kochi", "Kolkata", "Lucknow", "Mohali", "Mumbai", "Nagpur", "Navi Mumbai", "New Chandigarh", "Pune", "Raipur", "Rajkot", "Ranchi", "Thiruvananthapuram", "Vadodara", "Visakhapatnam"]);

const FORMATS = ["Test", "ODI", "T20I", "IPL"];
const COMPS = ["ODI World Cup", "T20 World Cup", "Champions Trophy", "Asia Cup", "WTC Final", "IPL", "Bilateral & Others"];
const BANDS = [["Duck", 0, 0], ["1-29", 1, 29], ["30-49", 30, 49], ["50-99", 50, 99], ["100-149", 100, 149], ["150+", 150, 1e9]];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const OPP = { AUS: "Australia", SL: "Sri Lanka", WI: "West Indies", NZ: "New Zealand", RSA: "South Africa", ENG: "England", BAN: "Bangladesh", PAK: "Pakistan", AFG: "Afghanistan", ZIM: "Zimbabwe", IRE: "Ireland", HKC: "Hong Kong", NED: "Netherlands", UAE: "UAE", USA: "USA", NEP: "Nepal", NAM: "Namibia", SCO: "Scotland", DC: "Delhi (DD/DC)", KKR: "Kolkata Knight Riders", CSK: "Chennai Super Kings", RCB: "Royal Challengers", PBKS: "Punjab Kings", RR: "Rajasthan Royals", SRH: "Sunrisers Hyderabad", LSG: "Lucknow Super Giants", GT: "Gujarat Titans", RPS: "Rising Pune Supergiant", MI: "Mumbai Indians", GL: "Gujarat Lions", DCG: "Deccan Chargers", PWI: "Pune Warriors", KTK: "Kochi Tuskers" };
const FRANCHISES = new Set(["DC", "KKR", "CSK", "RCB", "PBKS", "RR", "SRH", "LSG", "GT", "RPS", "MI", "GL", "DCG", "PWI", "KTK"]);

const compOf = (x) => {
  const t = x.tournament;
  if (x.format === "IPL") return "IPL";
  if (/T20|TWENTY20/.test(t) && /WORLD/.test(t)) return "T20 World Cup";
  if (/WORLD CUP/.test(t)) return "ODI World Cup";
  if (/CHAMPIONS TROPHY/.test(t)) return "Champions Trophy";
  if (/ASIA CUP/.test(t)) return "Asia Cup";
  if (/TEST CHAMPIONSHIP/.test(t)) return "WTC Final";
  return "Bilateral & Others";
};

const fd = (d) => `${d.slice(8)} ${MONTHS[+d.slice(5, 7) - 1]} ${d.slice(0, 4)}`;
const fix = (n, d = 2) => (n == null ? "—" : n.toFixed(d));
const nm = (k) => OPP[k] || k;

const DATA = BATTING.map((x) => ({
  ...x,
  comp: compOf(x),
  loc: HOME.has(x.ground) ? "In India" : "Overseas",
  band: BANDS.find((b) => x.runs >= b[1] && x.runs <= b[2])[0],
}));

const agg = (a) => {
  let runs = 0, no = 0, balls = 0, br = 0, f4 = 0, s6 = 0, h = 0, fif = 0, d = 0, n90 = 0, bc = 0, bt = 0, hs = null;
  for (const x of a) {
    runs += x.runs;
    if (x.notOut) no++;
    if (x.balls != null) { balls += x.balls; br += x.runs; }
    if (x.fours != null) { f4 += x.fours; s6 += x.sixes || 0; bc += x.fours * 4 + (x.sixes || 0) * 6; bt += x.runs; }
    if (x.runs >= 100) h++; else if (x.runs >= 50) fif++;
    if (x.runs === 0 && !x.notOut) d++;
    if (x.runs >= 90 && x.runs < 100) n90++;
    if (!hs || x.runs > hs.runs) hs = x;
  }
  const out = a.length - no;
  return { inn: a.length, runs, no, avg: out ? runs / out : null, sr: balls ? (br / balls) * 100 : null, hs, h, fif, d, f4, s6, n90, bc, bt, balls };
};

const grp = (a, key) => {
  const m = new Map();
  a.forEach((x) => { const k = x[key]; if (k) (m.get(k) || m.set(k, []).get(k)).push(x); });
  return [...m].map(([k, xs]) => ({ k, v: xs.reduce((s, x) => s + x.runs, 0), n: xs.length, ...agg(xs) }));
};

const best = (arr, fn) => arr.reduce((b, x) => (!b || fn(x) > fn(b) ? x : b), null);
const CAREER = FORMATS.map((fm) => ({ fm, ...agg(DATA.filter((x) => x.format === fm)) }));
const ALL = agg(DATA);

const DEF = { fmt: "All", comp: "All", loc: "All", band: "All", out: "All", year: "All", opp: "All", ground: "All", q: "" };
const chipUnused = null;

/* ---------- ANIMATION PRIMITIVES ---------- */

function Count({ to, dec = 0, suf = "" }) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (to == null) return;
    let raf, t0;
    const step = (t) => {
      t0 = t0 ?? t;
      const p = Math.min(1, (t - t0) / 1000);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);

  if (to == null) return "—";
  return v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
}

function Reveal({ children, className = "", d = 0 }) {
  const r = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = r.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={r} style={{ transitionDelay: `${d}ms` }} className={`rv ${on ? "rv-on" : ""} ${className}`}>{children}</div>;
}

function Bars({ rows, onPick, label = (k) => k }) {
  const mx = Math.max(1, ...rows.map((r) => r.v));
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <button key={r.k} onClick={() => onPick(r.k)} className="group flex w-full items-center gap-3 text-left">
          <span className="w-28 shrink-0 truncate text-xs font-bold text-white/55 group-hover:text-white">{label(r.k)}</span>
          <span className="relative h-5 flex-1 overflow-hidden rounded-full bg-white/5">
            <span className="bar absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-700 to-cyan-400" style={{ width: `${(r.v / mx) * 100}%`, animationDelay: `${i * 45}ms` }} />
          </span>
          <span className="w-14 text-right text-xs font-black">{r.v.toLocaleString("en-US")}</span>
        </button>
      ))}
    </div>
  );
}

function Line({ a }) {
  if (a.length < 2) return <p className="py-10 text-center text-sm text-white/40">Not enough innings.</p>;
  let c = 0;
  const pts = a.map((x) => (c += x.runs));
  const W = 800, H = 220, mx = c;
  const P = pts.map((y, i) => `${i ? "L" : "M"}${((i / (pts.length - 1)) * W).toFixed(1)},${(H - (y / mx) * (H - 12) - 6).toFixed(1)}`).join("");
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <defs>
          <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#3b82f6" stopOpacity=".45" /><stop offset="1" stopColor="#3b82f6" stopOpacity="0" /></linearGradient>
        </defs>
        <path key={"a" + pts.length + mx} d={`${P}L${W},${H}L0,${H}Z`} fill="url(#lg)" className="fade" />
        <path key={"b" + pts.length + mx} d={P} fill="none" stroke="#67e8f9" strokeWidth="2.5" pathLength="1" className="draw" />
      </svg>
      <div className="mt-1 flex justify-between text-[11px] font-bold text-white/40">
        <span>{fd(a[0].date)}</span>
        <span className="text-cyan-300">{mx.toLocaleString("en-US")} runs</span>
        <span>{fd(a[a.length - 1].date)}</span>
      </div>
    </div>
  );
}

const FCOL = { Test: "#ef4444", ODI: "#3b82f6", T20I: "#22d3ee", IPL: "#f59e0b" };
const CNT = (k) => { const m = {}; DATA.forEach((x) => { m[x[k]] = (m[x[k]] || 0) + 1; }); return m; };
const C = { fmt: CNT("format"), comp: CNT("comp"), loc: CNT("loc"), band: CNT("band"), year: CNT("year"), opp: CNT("opp"), ground: CNT("ground") };
const OUTC = { "Not out": DATA.filter((x) => x.notOut).length, Out: DATA.filter((x) => !x.notOut).length };
const LABEL = { fmt: "Format", comp: "Tournament", loc: "Venue", out: "Result", band: "Score band", year: "Year", opp: "Opposition", ground: "Ground", q: "Search" };

function Chip({ on, onClick, label, n }) {
  return <button onClick={onClick} className={`chp ${on ? "chp-on" : ""}`}>{label}{n != null && <span className="ml-1.5 opacity-60">{n}</span>}</button>;
}

function Group({ title, value, open, children }) {
  return (
    <details open={open} className="grp border-b border-white/10 py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-black uppercase tracking-widest text-white/60 hover:text-white">
        <span>{title}</span>
        <span className="flex items-center gap-2">
          {value && value !== "All" && <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] normal-case tracking-normal text-white">{value}</span>}
          <span className="plus text-base">+</span>
        </span>
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}

function Glass({ children, className = "" }) {
  const mv = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
    e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
  };
  return <div onMouseMove={mv} className={`glass ${className}`}>{children}</div>;
}

function Fx() {
  const g = useRef(null), p = useRef(null);
  useEffect(() => {
    const m = (e) => { if (g.current) g.current.style.transform = `translate(${e.clientX - 200}px,${e.clientY - 200}px)`; };
    const s = () => { const h = document.documentElement; if (p.current) p.current.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`; };
    window.addEventListener("mousemove", m);
    window.addEventListener("scroll", s, { passive: true });
    return () => { window.removeEventListener("mousemove", m); window.removeEventListener("scroll", s); };
  }, []);
  return (
    <>
      <div ref={p} className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-white" style={{ transform: "scaleX(0)", transformOrigin: "left" }} />
      <div ref={g} className="pointer-events-none fixed left-0 top-0 z-[1] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-3xl" />
    </>
  );
}

function Stack({ rows, onPick }) {
  const mx = Math.max(1, ...rows.map((r) => r.t));
  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-4 text-xs font-bold">
        {FORMATS.map((fm) => <span key={fm} className="flex items-center gap-1.5 text-white/60"><i className="h-2.5 w-2.5 rounded-full" style={{ background: FCOL[fm] }} />{fm}</span>)}
      </div>
      <div className="flex h-64 items-end gap-1">
        {rows.map((r, i) => (
          <button key={r.k} onClick={() => onPick(r.k)} title={FORMATS.filter((fm) => r.seg[fm]).map((fm) => `${fm} ${r.seg[fm]}`).join(" · ")} className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end">
            <span className="mb-1 text-[10px] font-black text-white/0 transition group-hover:text-white">{r.t}</span>
            <span className="col flex w-full flex-col-reverse overflow-hidden rounded-t-md opacity-90 transition group-hover:opacity-100" style={{ height: `${(r.t / mx) * 80}%`, animationDelay: `${i * 35}ms` }}>
              {FORMATS.map((fm) => (r.seg[fm] ? <span key={fm} style={{ height: `${(r.seg[fm] / r.t) * 100}%`, background: FCOL[fm] }} /> : null))}
            </span>
            <span className="mt-1 truncate text-[9px] font-bold text-white/45">’{r.k.slice(2)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function InningsPage() {
  const [f, setF] = useState(DEF);
  const [sort, setSort] = useState({ k: "date", d: -1 });
  const [lim, setLim] = useState(50);
  const [fo, setFo] = useState(false);
  const set = (k, v) => setF((s) => ({ ...s, [k]: s[k] === v && k !== "q" ? "All" : v }));

  const fl = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    return DATA.filter((x) =>
      (f.fmt === "All" || x.format === f.fmt) && (f.comp === "All" || x.comp === f.comp) &&
      (f.loc === "All" || x.loc === f.loc) && (f.band === "All" || x.band === f.band) &&
      (f.out === "All" || (f.out === "Not out" ? x.notOut : !x.notOut)) &&
      (f.year === "All" || x.year === f.year) && (f.opp === "All" || x.opp === f.opp) &&
      (f.ground === "All" || x.ground === f.ground) &&
      (!q || `${x.opp} ${nm(x.opp)} ${x.ground} ${x.format} ${x.date} ${x.tournament} ${x.comp}`.toLowerCase().includes(q))
    );
  }, [f]);

  const L = useMemo(() => {
    const A = agg(fl);
    const byOpp = grp(fl, "opp"), byGr = grp(fl, "ground"), byYr = grp(fl, "year"), byBand = grp(fl, "band");
    const asc = [...fl].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
    const wb = fl.filter((x) => x.balls);
    const ctx = (x) => (x ? `${x.runs}${x.notOut ? "*" : ""} vs ${nm(x.opp)} · ${x.ground} · ${fd(x.date)}` : "No data for these filters");
    const f100 = wb.filter((x) => x.runs >= 100).reduce((b, x) => (!b || x.balls < b.balls ? x : b), null);
    const hiSR = best(wb.filter((x) => x.runs >= 30), (x) => x.runs / x.balls);
    const long = best(wb, (x) => x.balls);
    const fav = best(byOpp, (x) => x.v), fort = best(byGr, (x) => x.v), bYr = best(byYr, (x) => x.v);
    const bAvg = best(byOpp.filter((x) => x.n >= 5 && x.avg != null), (x) => x.avg);
    const hm = agg(fl.filter((x) => x.loc === "In India")), aw = agg(fl.filter((x) => x.loc === "Overseas"));
    const bx = fl.filter((x) => x.fours != null).length;
    const gold = fl.filter((x) => x.runs === 0 && x.balls === 1 && !x.notOut).length;
    const cards = [
      { t: "Fastest hundred", v: f100?.balls, suf: " balls", s: ctx(f100) },
      { t: "Highest strike-rate knock", v: hiSR ? (hiSR.runs / hiSR.balls) * 100 : null, dec: 1, s: ctx(hiSR) },
      { t: "Marathon innings", v: long?.balls, suf: " balls", s: ctx(long) },
      { t: "Favourite opposition", v: fav?.v, suf: " runs", s: fav ? `${nm(fav.k)} · ${fav.n} inns · avg ${fix(fav.avg)}` : "—" },
      { t: "Best average vs (5+ inns)", v: bAvg?.avg, dec: 1, s: bAvg ? `${nm(bAvg.k)} · ${bAvg.n} inns · ${bAvg.h} hundreds` : "Needs 5+ innings vs a side" },
      { t: "Fortress ground", v: fort?.v, suf: " runs", s: fort ? `${fort.k} · ${fort.n} inns · avg ${fix(fort.avg)}` : "—" },
      { t: "Best year", v: bYr?.v, suf: " runs", s: bYr ? `${bYr.k} · ${bYr.n} inns · ${bYr.h} hundreds` : "—" },
      { t: "Hundred conversion", v: A.h + A.fif ? (A.h / (A.h + A.fif)) * 100 : null, suf: "%", s: `${A.h} hundreds from ${A.h + A.fif} fifty-plus scores` },
      { t: "Nervous nineties", v: A.n90, s: "scores between 90 and 99" },
      { t: "Boundary power", v: A.bt ? (A.bc / A.bt) * 100 : null, suf: "%", s: "of runs from 4s & 6s (where recorded)" },
      { t: "Sixes per innings", v: bx ? A.s6 / bx : null, dec: 2, s: `${A.s6} sixes · ${A.f4} fours` },
      { t: "Golden ducks", v: gold, s: "out first ball" },
      { t: "In India vs overseas avg", v: `${fix(hm.avg, 1)} / ${fix(aw.avg, 1)}`, s: `${hm.runs.toLocaleString("en-US")} runs at home · ${aw.runs.toLocaleString("en-US")} away` },
      { t: "Not-out knocks", v: A.no, s: "finished unbeaten" },
    ];
    const stack = [...new Set(fl.map((x) => x.year))].sort().map((y) => {
      const seg = {}; let t = 0;
      fl.forEach((x) => { if (x.year === y) { seg[x.format] = (seg[x.format] || 0) + x.runs; t += x.runs; } });
      return { k: y, seg, t };
    });
    return {
      A, cards, asc, stack,
      opp: byOpp.sort((a, b) => b.v - a.v).slice(0, 10),
      gr: byGr.sort((a, b) => b.v - a.v).slice(0, 10),
      topInn: [...fl].sort((a, b) => b.runs - a.runs).slice(0, 10),
    };
  }, [fl]);

  const A = L.A;
  const years = useMemo(() => [...new Set(DATA.map((x) => x.year))].sort().reverse(), []);
  const opps = useMemo(() => [...new Set(DATA.map((x) => x.opp))], []);
  const grounds = useMemo(() => [...new Set(DATA.map((x) => x.ground))].sort(), []);

  const rows = useMemo(() => {
    const v = (x) => (sort.k === "sr" ? (x.balls ? x.runs / x.balls : x.sr ?? -1) : x[sort.k]);
    return [...fl].sort((a, b) => {
      const p = v(a), q = v(b);
      if (p == null) return 1;
      if (q == null) return -1;
      return (p > q ? 1 : p < q ? -1 : 0) * sort.d;
    });
  }, [fl, sort]);

  const active = Object.entries(f).filter(([, v]) => v !== "All" && v !== "");
  const cols = [["date", "Date"], ["format", "Format"], ["opp", "Opposition"], ["ground", "Ground"], ["runs", "Runs"], ["balls", "Balls"], ["fours", "4s"], ["sixes", "6s"], ["sr", "SR"], ["tournament", "Series"]];
  const cell = (x, k) => k === "date" ? fd(x.date) : k === "format" ? (x.inn ? `${x.format} · inn ${x.inn}` : x.format) : k === "opp" ? nm(x.opp) : k === "runs" ? `${x.runs}${x.notOut ? "*" : ""}` : k === "sr" ? (x.balls ? ((x.runs / x.balls) * 100).toFixed(1) : x.sr != null ? x.sr.toFixed(1) : "—") : x[k] ?? "—";

  const ticker = [`${ALL.runs.toLocaleString("en-US")} RUNS`, `${ALL.h} HUNDREDS`, `${ALL.fif} FIFTIES`, `HIGHEST ${ALL.hs.runs}`, `${ALL.s6} SIXES`, `${ALL.inn} INNINGS`, ...CAREER.map((c) => `${c.fm} ${c.runs.toLocaleString("en-US")}`)];

  return (
    <Page active="Innings">
      <Fx />
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#02040a,#050b24_70%,#000)]" />
        <div className="blob left-[-10%] top-[0%] h-[30rem] w-[30rem] bg-blue-600/40" />
        <div className="blob right-[-8%] top-[25%] h-[26rem] w-[26rem] bg-cyan-500/25" style={{ animationDelay: "-7s" }} />
        <div className="blob bottom-[-10%] left-[35%] h-[22rem] w-[22rem] bg-indigo-500/25" style={{ animationDelay: "-3s" }} />
        <div className={`${display.className} outline-blue pointer-events-none absolute right-[-2%] top-[2%] select-none text-[40vw] leading-none opacity-40`} aria-hidden>45</div>
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <p className="hero-in text-xs font-black uppercase tracking-[0.4em] text-cyan-300">2007 → 2026 · {ALL.inn} innings</p>
          <h1 className={`${display.className} mt-3 leading-[0.85]`}>
            <span className="hero-in grad block text-[16vw] lg:text-[8.5rem]" style={{ animationDelay: ".1s" }}>THE HITMAN</span>
            <span className="hero-in outline block text-[16vw] lg:text-[8.5rem]" style={{ animationDelay: ".25s" }}>VAULT</span>
          </h1>
          <p className="hero-in mt-5 max-w-xl text-white/55" style={{ animationDelay: ".4s" }}>Every Test, ODI, T20I and IPL innings. Slice it by tournament, opposition, ground, year — the whole page re-computes live.</p>
          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {CAREER.map((c, i) => (
              <button key={c.fm} onClick={() => set("fmt", c.fm)} className="hero-in text-left" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                <Glass className="p-5">
                  <p className="text-xs font-black" style={{ color: FCOL[c.fm] }}>{c.fm} · {c.inn} inns</p>
                  <p className={`${display.className} text-5xl`}><Count to={c.runs} /></p>
                  <p className="text-xs text-white/50">avg {fix(c.avg)} · HS {c.hs.runs} · {c.h} × 100</p>
                </Glass>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-blue-950/30 py-3">
        <div className="ticker">
          {[...ticker, ...ticker].map((t, i) => <span key={i} className={`${display.className} mx-6 whitespace-nowrap text-sm text-white/70`}>{t} <span className="text-cyan-400">◆</span></span>)}
        </div>
      </div>

      <section className="bg-black px-5 pb-28 pt-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <button onClick={() => setFo((o) => !o)} className="mb-4 w-full rounded-full bg-blue-600 py-3 text-sm font-black lg:hidden">{fo ? "Hide filters" : `Filters${active.length ? ` (${active.length})` : ""}`}</button>
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            {/* FILTER STUDIO */}
            <aside className={`${fo ? "block" : "hidden"} lg:block`}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
                <div className="flex items-center justify-between">
                  <p className={`${display.className} text-2xl`}>Filter <span className="grad">Studio</span></p>
                  <button onClick={() => setF(DEF)} className="text-xs font-bold text-white/40 hover:text-white">Reset all</button>
                </div>
                <input value={f.q} onChange={(e) => set("q", e.target.value)} placeholder="Search team, ground, series…" aria-label="Search" className="mt-4 w-full rounded-full border border-white/15 bg-black px-4 py-2.5 text-sm font-bold text-white outline-none focus:border-blue-400" />
                <Group title="Format" value={f.fmt} open>
                  <div className="flex flex-wrap gap-1.5">{FORMATS.map((x) => <Chip key={x} on={f.fmt === x} onClick={() => set("fmt", x)} label={x} n={C.fmt[x]} />)}</div>
                </Group>
                <Group title="Tournament" value={f.comp} open>
                  <div className="flex flex-wrap gap-1.5">{COMPS.map((x) => <Chip key={x} on={f.comp === x} onClick={() => set("comp", x)} label={x} n={C.comp[x] || 0} />)}</div>
                </Group>
                <Group title="Venue" value={f.loc} open>
                  <div className="flex flex-wrap gap-1.5">{["In India", "Overseas"].map((x) => <Chip key={x} on={f.loc === x} onClick={() => set("loc", x)} label={x} n={C.loc[x]} />)}</div>
                </Group>
                <Group title="Result" value={f.out} open>
                  <div className="flex flex-wrap gap-1.5">{["Not out", "Out"].map((x) => <Chip key={x} on={f.out === x} onClick={() => set("out", x)} label={x} n={OUTC[x]} />)}</div>
                </Group>
                <Group title="Score band" value={f.band} open>
                  <div className="flex flex-wrap gap-1.5">{BANDS.map((b) => <Chip key={b[0]} on={f.band === b[0]} onClick={() => set("band", b[0])} label={b[0]} n={C.band[b[0]] || 0} />)}</div>
                </Group>
                <Group title="Year" value={f.year}>
                  <div className="flex flex-wrap gap-1.5">{years.map((y) => <Chip key={y} on={f.year === y} onClick={() => set("year", y)} label={y} n={C.year[y]} />)}</div>
                </Group>
                <Group title="Opposition" value={f.opp === "All" ? "All" : nm(f.opp)}>
                  <p className="mb-1.5 text-[10px] font-black uppercase tracking-widest text-white/30">National teams</p>
                  <div className="flex flex-wrap gap-1.5">{opps.filter((o) => !FRANCHISES.has(o)).sort((a, b) => C.opp[b] - C.opp[a]).map((o) => <Chip key={o} on={f.opp === o} onClick={() => set("opp", o)} label={nm(o)} n={C.opp[o]} />)}</div>
                  <p className="mb-1.5 mt-4 text-[10px] font-black uppercase tracking-widest text-white/30">IPL franchises</p>
                  <div className="flex flex-wrap gap-1.5">{opps.filter((o) => FRANCHISES.has(o)).sort((a, b) => C.opp[b] - C.opp[a]).map((o) => <Chip key={o} on={f.opp === o} onClick={() => set("opp", o)} label={nm(o)} n={C.opp[o]} />)}</div>
                </Group>
                <Group title="Ground" value={f.ground}>
                  <div className="flex max-h-64 flex-wrap gap-1.5 overflow-y-auto pr-1">{[...grounds].sort((a, b) => C.ground[b] - C.ground[a]).map((g) => <Chip key={g} on={f.ground === g} onClick={() => set("ground", g)} label={g} n={C.ground[g]} />)}</div>
                </Group>
              </div>
            </aside>

            {/* RESULTS */}
            <div className="min-w-0">
              <div className="sticky top-[64px] z-30 -mx-2 rounded-2xl border border-white/10 bg-black/80 px-4 py-2.5 backdrop-blur-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`${display.className} mr-2 text-lg text-cyan-300`}><Count to={fl.length} /> <span className="text-xs text-white/50">of {DATA.length} innings</span></span>
                  {active.map(([k, v]) => (
                    <button key={k} onClick={() => setF((s) => ({ ...s, [k]: k === "q" ? "" : "All" }))} className="slide rounded-full border border-blue-400/40 bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-200 hover:bg-red-500/20">{LABEL[k]}: {k === "opp" ? nm(v) : v} ✕</button>
                  ))}
                  {!active.length && <span className="text-xs text-white/35">All innings — pick filters on the left or tap a chart.</span>}
                </div>
              </div>

              {!fl.length ? (
                <p className="py-24 text-center text-white/40">No innings match these filters.</p>
              ) : (
                <>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                    {[["Innings", A.inn, 0], ["Runs", A.runs, 0], ["Average", A.avg, 2], ["Strike rate", A.sr, 2], ["Highest", A.hs.runs, 0, A.hs.notOut ? "*" : ""], ["100s", A.h, 0], ["50s", A.fif, 0], ["Ducks", A.d, 0], ["Not outs", A.no, 0], ["4s", A.f4, 0], ["6s", A.s6, 0], ["Balls faced", A.balls, 0]].map(([l, v, dec, suf], i) => (
                      <Reveal key={l} d={i * 40}>
                        <Glass className="p-5">
                          <p className={`${display.className} text-3xl text-blue-300 sm:text-4xl`}><Count to={v || v === 0 ? v : null} dec={dec} suf={suf || ""} /></p>
                          <p className="mt-1 text-xs font-bold text-white/50">{l}</p>
                        </Glass>
                      </Reveal>
                    ))}
                  </div>

                  <Reveal className="mt-12"><h2 className={`${display.className} text-4xl sm:text-5xl`}>Stat <span className="grad">Lab</span></h2><p className="mt-1 text-sm text-white/50">Out-of-the-box numbers — all follow your filters.</p></Reveal>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {L.cards.map((c, i) => (
                      <Reveal key={c.t} d={(i % 3) * 70}>
                        <Glass className="h-full p-6">
                          <p className="text-xs font-black uppercase tracking-widest text-cyan-300/80">{c.t}</p>
                          <p className={`${display.className} mt-2 text-4xl sm:text-5xl`}>{typeof c.v === "number" ? <Count to={c.v} dec={c.dec || 0} suf={c.suf || ""} /> : c.v ?? "—"}</p>
                          <p className="mt-2 text-xs text-white/55">{c.s}</p>
                        </Glass>
                      </Reveal>
                    ))}
                  </div>

                  <div className="mt-12 grid gap-4">
                    <Reveal><Glass className="p-6"><p className="mb-3 text-sm font-black">Career runs journey</p><Line a={L.asc} /></Glass></Reveal>
                    <Reveal><Glass className="p-6"><p className="mb-3 text-sm font-black">Runs per year, split by format <span className="text-white/35">· tap a year to filter</span></p><Stack rows={L.stack} onPick={(y) => set("year", y)} /></Glass></Reveal>
                    <Reveal><Glass className="p-6"><p className="mb-3 text-sm font-black">Top 10 opposition by runs <span className="text-white/35">· tap to filter</span></p><Bars rows={L.opp} onPick={(k) => set("opp", k)} label={nm} /></Glass></Reveal>
                  </div>

                  <Reveal className="mt-12"><h2 className={`${display.className} text-4xl sm:text-5xl`}>Top <span className="grad">10</span> knocks</h2></Reveal>
                  <div className="mt-5 space-y-2">
                    {L.topInn.map((x, i) => (
                      <div key={i} className="slide flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-blue-400/50 hover:bg-blue-500/10" style={{ animationDelay: `${i * 60}ms` }}>
                        <span className="w-6 text-center text-sm font-black text-white/30">{i + 1}</span>
                        <span className={`${display.className} w-24 text-4xl text-blue-300`}>{x.runs}{x.notOut ? "*" : ""}</span>
                        <span className="flex-1 text-sm text-white/70">vs {nm(x.opp)} · {x.ground}<br /><span className="text-xs text-white/40">{fd(x.date)} · {x.tournament}</span></span>
                        <span className="hidden text-right text-xs font-bold sm:block" style={{ color: FCOL[x.format] }}>{x.format}{x.balls ? <><br />{x.balls} balls</> : null}</span>
                      </div>
                    ))}
                  </div>

                  <Reveal className="mt-12"><h2 className={`${display.className} text-4xl sm:text-5xl`}>The <span className="grad">Scorebook</span></h2><p className="mt-1 text-sm text-white/50">Every innings behind these numbers — tap a column to sort.</p></Reveal>
                  <div className="mt-5 max-h-[70vh] overflow-auto rounded-3xl border border-white/10">
                    <table className="w-full min-w-[900px] text-left">
                      <thead className="sticky top-0 z-10 bg-[#0a0d14]">
                        <tr>
                          <th className="px-4 py-4 text-xs font-bold text-white/35">#</th>
                          {cols.map(([k, l]) => (
                            <th key={k} className="px-4 py-4 text-xs font-bold">
                              <button onClick={() => setSort((s) => ({ k, d: s.k === k ? -s.d : -1 }))} className={sort.k === k ? "text-blue-400" : "text-white/45 hover:text-white"}>{l} {sort.k === k ? (sort.d < 0 ? "↓" : "↑") : ""}</button>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.slice(0, lim).map((x, i) => (
                          <tr key={i} className={`border-t border-white/5 transition hover:bg-blue-500/10 ${x.runs >= 100 ? "bg-blue-500/15" : ""}`}>
                            <td className="px-4 py-3 text-xs text-white/30">{i + 1}</td>
                            {cols.map(([k]) => <td key={k} className={`whitespace-nowrap px-4 py-3 text-sm ${k === "runs" ? `${display.className} text-xl ${x.runs >= 50 ? "text-blue-300" : x.runs === 0 && !x.notOut ? "text-red-300/80" : "text-white/80"}` : "text-white/60"}`}>{cell(x, k)}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {lim < rows.length && <button onClick={() => setLim((n) => n + 100)} className="mt-4 text-sm font-bold text-blue-300 transition hover:text-white">Showing {Math.min(lim, rows.length)} of {rows.length} — show 100 more</button>}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .outline-blue { color: transparent; -webkit-text-stroke: 1px rgba(59,130,246,.65); }
        .outline { color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,.65); }
        .grad { background: linear-gradient(90deg,#fff,#60a5fa,#22d3ee,#fff); background-size: 300% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shine 6s linear infinite; }
        .blob { position: absolute; border-radius: 9999px; filter: blur(90px); animation: float 14s ease-in-out infinite alternate; }
        .hero-in { animation: up .9s cubic-bezier(.16,1,.3,1) both; }
        .rv { opacity: 0; transform: translateY(30px); transition: opacity .7s ease, transform .8s cubic-bezier(.16,1,.3,1); }
        .rv-on { opacity: 1; transform: none; }
        .glass { position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,.1); border-radius: 1.5rem; background: radial-gradient(260px circle at var(--mx,50%) var(--my,-60%), rgba(59,130,246,.25), transparent 65%), rgba(255,255,255,.03); transition: border-color .3s, box-shadow .3s; }
        .glass:hover { border-color: rgba(96,165,250,.55); box-shadow: 0 0 40px rgba(37,99,235,.18); }
        .chp { border: 1px solid rgba(255,255,255,.14); border-radius: 9999px; padding: .4rem .8rem; font-size: .75rem; font-weight: 800; color: rgba(255,255,255,.6); transition: background .25s, color .25s, border-color .25s, box-shadow .25s; }
        .chp:hover { color: #fff; border-color: #fff; }
        .chp-on { background: #2563eb; border-color: #2563eb; color: #fff; box-shadow: 0 0 22px rgba(37,99,235,.6); }
        .grp[open] .plus { transform: rotate(45deg); }
        .plus { transition: transform .3s; }
        .bar { transform-origin: left; animation: growX .9s cubic-bezier(.16,1,.3,1) both; transition: width .7s cubic-bezier(.16,1,.3,1); }
        .col { transform-origin: bottom; animation: growY .9s cubic-bezier(.16,1,.3,1) both; transition: height .7s cubic-bezier(.16,1,.3,1); }
        .draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 1.8s ease forwards; }
        .fade { animation: fadeIn 1.8s ease both; }
        .ticker { display: flex; width: max-content; animation: tick 45s linear infinite; }
        .slide { animation: slideIn .6s cubic-bezier(.16,1,.3,1) both; }
        @keyframes shine { to { background-position: -300% 0; } }
        @keyframes float { to { transform: translate(60px,-40px) scale(1.2); } }
        @keyframes up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
        @keyframes growX { from { transform: scaleX(0); } to { transform: none; } }
        @keyframes growY { from { transform: scaleY(0); } to { transform: none; } }
        @keyframes draw { to { stroke-dashoffset: 0; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes tick { to { transform: translateX(-50%); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-26px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .grad,.blob,.hero-in,.bar,.col,.draw,.fade,.ticker,.slide { animation: none !important; } .draw { stroke-dashoffset: 0; } .rv { opacity: 1; transform: none; } }
      `}</style>
    </Page>
  );
}