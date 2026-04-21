'use client'

import { useState, useEffect, useMemo } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

export default function ParticlesBg() {
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
                value: 50,
                density: { enable: true, width: 1920, height: 1080 },
            },
            color: {
                value: ["#f59e0b", "#eab308", "#d97706", "#fbbf24", "#b45309"],
            },
            shape: {
                type: ["polygon", "star"],
                options: {
                    polygon: { sides: 4 },
                    star: { sides: 4 },
                },
            },
            opacity: {
                value: { min: 0.08, max: 0.25 },
            },
            size: {
                value: { min: 4, max: 12 },
            },
            rotate: {
                value: { min: 0, max: 360 },
                animation: { enable: true, speed: 4, sync: false },
            },
            move: {
                enable: true,
                speed: { min: 0.3, max: 1.2 },
                direction: "top" as const,
                outModes: { default: "out" as const },
                straight: false,
                random: true,
            },
            zIndex: {
                value: { min: 0, max: 5 },
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
            id="diamond-particles"
            options={options}
            className="absolute inset-0 pointer-events-none z-[1]"
        />
    )
}
