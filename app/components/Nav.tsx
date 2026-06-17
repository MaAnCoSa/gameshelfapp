"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div style={{
        "fontSize": 16,
        "fontFamily": '"Croissant One", "serif"',
        "fontWeight": 400,
        "fontStyle": "normal",

        "display": "flex",
        "justifyContent": "center",
        "marginTop": "10px",
        "padding": "5px 0 5px 0",

        "backgroundColor": "#240046",
        "borderRadius": "10px",
    }}>
      <Link style={{
        "display": "flex",
        "justifyContent": "center",

        "margin": "auto",
        "width": "90px",
        "fontWeight": isActive('/') ? 'bold' : 'normal'
      }} href="/">
        Inicio
      </Link>
      <Link style={{
        "display": "flex",
        "justifyContent": "center",

        "margin": "auto",
        "width": "90px",
        "fontWeight": isActive('/mygames') ? 'bold' : 'normal'
      }} href="/mygames">
        Juegos
      </Link>
      <Link style={{
        "display": "flex",
        "justifyContent": "center",

        "margin": "auto",
        "width": "90px",
        "fontWeight": isActive('/friends') ? 'bold' : 'normal'
      }} href="/friends">
        Amigos
      </Link>

    </div>
  );
}