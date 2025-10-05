import { writable } from "svelte/store"

// Romanian cities and names for realistic mock data
const romanianCities = [
    "București",
    "Cluj-Napoca",
    "Timișoara",
    "Iași",
    "Constanța",
    "Craiova",
    "Brașov",
    "Galați",
    "Ploiești",
    "Oradea",
    "Brăila",
    "Arad",
    "Pitești",
    "Sibiu",
    "Bacău",
]

const romanianNames = [
    "George Ionescu",
    "Maria Popescu",
    "Ion Popa",
    "Elena Dumitrescu",
    "Andrei Stanciu",
    "Ana Gheorghe",
    "Mihai Constantinescu",
    "Ioana Munteanu",
    "Alexandru Stoica",
    "Cristina Radu",
    "Vlad Nistor",
    "Diana Barbu",
    "Ștefan Moldovan",
    "Gabriela Dinu",
    "Adrian Florea",
    "Raluca Marinescu",
    "Bogdan Vasile",
    "Simona Lungu",
    "Cosmin Ilie",
    "Laura Oprea",
]

const energyTypes = ["Solar", "Wind", "Hydro", "Mixed"]

// Generate prosumers
export const prosumers = Array.from({ length: 50 }, (_, i) => ({
    id: `prosumer-${i + 1}`,
    name:
        romanianNames[i % romanianNames.length] +
        (i >= romanianNames.length ? ` ${Math.floor(i / romanianNames.length) + 1}` : ""),
    location: romanianCities[i % romanianCities.length],
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
    energyType: energyTypes[Math.floor(Math.random() * energyTypes.length)],
    availableKwh: Math.floor(Math.random() * 500) + 10,
    pricePerKwh: +(0.3 + Math.random() * 0.35).toFixed(2),
    reputation: +(3.5 + Math.random() * 1.5).toFixed(1),
    totalSales: Math.floor(Math.random() * 500) + 10,
    capacity: Math.floor(Math.random() * 100) + 1,
    verified: Math.random() > 0.3,
    distance: Math.floor(Math.random() * 200) + 1,
    memberSince: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
}))

// Generate transactions
export const transactions = Array.from({ length: 100 }, (_, i) => {
    const prosumer = prosumers[Math.floor(Math.random() * prosumers.length)]
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))

    return {
        id: `tx-${i + 1}`,
        hash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
        seller: prosumer.name,
        sellerLocation: prosumer.location,
        buyer: `Consumer ${Math.floor(Math.random() * 100) + 1}`,
        quantity: Math.floor(Math.random() * 100) + 5,
        price: prosumer.pricePerKwh,
        energyType: prosumer.energyType,
        timestamp: date.toISOString(),
        status: "completed",
    }
})

// Generate price history (365 days)
export const priceHistory = Array.from({ length: 365 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (365 - i))
    return {
        date: date.toISOString().split("T")[0],
        price: +(0.35 + Math.sin(i / 30) * 0.1 + Math.random() * 0.1).toFixed(2),
    }
})

// User state
export const userStore = writable({
    id: "user-1",
    name: "Mihai Popescu",
    email: "mihai.popescu@example.com",
    location: "București",
    isProsumer: true,
    greenTokens: 245.5,
    ronBalance: 1250.75,
    eurBalance: 250.0,
    totalEnergyTraded: 1847,
    totalEarnings: 3420.5,
    co2Saved: 1234,
    memberSince: "2024-01-15",
    reputation: 4.8,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
})

// Market stats
export const marketStats = writable({
    totalEnergyToday: 12847,
    activeProsumers: 342,
    currentAvgPrice: 0.43,
    co2Saved: 8456,
    priceChange: 2.5,
})

// Dark mode
export const darkMode = writable(false)

// Filters
export const filters = writable({
    energyTypes: [] as string[],
    priceRange: [0.25, 0.7] as [number, number],
    locations: [] as string[],
    minReputation: 0,
    sortBy: "price-low" as string,
})
