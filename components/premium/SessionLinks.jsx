"use client";
import {useEffect} from 'react';import {usePathname} from 'next/navigation';
export default function SessionLinks(){const pathname=usePathname();useEffect(()=>{const openHash=()=>{const id=decodeURIComponent(location.hash.slice(1));const el=document.getElementById(id);if(el?.tagName==='DETAILS')el.open=true;};openHash();window.addEventListener('hashchange',openHash);return()=>window.removeEventListener('hashchange',openHash)},[pathname]);return null;}
