"use client"
import { Scheduler } from "@bitnoi.se/react-scheduler"
import "@bitnoi.se/react-scheduler/dist/style.css"
import { useState, useCallback } from "react"

const TaskScheduler = () => {
    const [range, setRange] = useState({
        startDate: new Date(),
        endDate: new Date()
    })

    const handleRangeChange = useCallback((range) => {
        setRange(range)
    }, [])

    return (
        <div style={{ height: "500px", position: "relative" }}>
            <Scheduler
                data={[]} // Şimdilik boş bırakıyoruz
                onRangeChange={handleRangeChange}
                config={{
                    zoom: 1,
                    showTooltip: true,
                }}
            />
        </div>
    )
}

export default TaskScheduler 