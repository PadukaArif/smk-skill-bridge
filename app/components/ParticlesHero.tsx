'use client'

import { useState, useEffect, useMemo } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

export default function ParticlesHero() {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine)
        }).then(() => setReady(true))
    }, [])

    const options = useMemo(() => ({
        fullScreen: false,
        fpsLimit: 60,
        particles: {
            number: {
                value: 12,
            },
            color: {
                value: ["#f59e0b", "#d97706", "#fbbf24", "#b45309"],
            },
            shape: {
                type: ["polygon", "star"],
                options: {
                    polygon: { sides: 4 },
                    star: { sides: 5 },
                },
            },
            opacity: {
                value: { min: 0.04, max: 0.12 },
            },
            size: {
                value: { min: 15, max: 35 },
            },
            rotate: {
                value: { min: 0, max: 360 },
                animation: { enable: true, speed: 2, sync: false },
            },
            move: {
                enable: true,
                speed: { min: 0.2, max: 0.6 },
                direction: "top" as const,
                outModes: { default: "out" as const },
                straight: false,
                random: true,
            },
        },
        interactivity: {
            events: {
                onClick: { enable: false },
                onHover: { enable: false },
            },
        },
        detectRetina: true,
    }), [])

    if (!ready) return null

    return (
        <Particles
            id="hero-particles"
            options={options}
            className="absolute inset-0 pointer-events-none z-[1]"
        />
    )
}
