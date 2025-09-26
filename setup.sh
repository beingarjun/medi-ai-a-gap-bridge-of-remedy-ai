#!/bin/bash
cp .env.example .env
npm install
npm --workspace server run dev &
npm --workspace web run dev &
