<script lang="ts">
    import { Download } from 'lucide-svelte';
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';

    let chartCanvas: HTMLCanvasElement;
    let chartInstance: Chart | null = null;

    onMount(() => {
        const labels = Array.from({ length: 30 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (29 - i));
            return date.toLocaleDateString('ro-RO', { month: 'short', day: 'numeric' });
        });

        const priceData = Array.from({ length: 30 }, () =>
            Math.random() * 0.5 + 0.3 // Random prices between 0.3 and 0.8 RON/kWh
        );

        const ctx = chartCanvas.getContext('2d');
        if (ctx) {
            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Energy Price (RON/kWh)',
                        data: priceData,
                        borderColor: 'rgb(34, 197, 94)',
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        pointBackgroundColor: 'rgb(34, 197, 94)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                color: 'hsl(var(--foreground))',
                                font: {
                                    size: 12
                                }
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.parsed.y.toFixed(2)} RON/kWh`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: 'hsl(var(--muted-foreground))',
                                maxRotation: 45,
                                minRotation: 45
                            }
                        },
                        y: {
                            beginAtZero: false,
                            grid: {
                                color: 'hsl(var(--border))'
                            },
                            ticks: {
                                color: 'hsl(var(--muted-foreground))',
                                callback: function(value) {
                                    //@ts-ignore
                                    return value.toFixed(2) + ' RON';
                                }
                            }
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            });
        }

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    });
</script>

<div class="container mx-auto px-4 py-8 space-y-8">
    <div>
        <h1 class="text-3xl font-bold mb-2">Analytics & Reports</h1>
        <p class="text-muted-foreground">Detailed insights into your energy trading</p>
    </div>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-card border rounded-xl p-6">
            <div class="text-sm text-muted-foreground mb-1">Total Energy Traded</div>
            <div class="text-3xl font-bold">1,847</div>
            <div class="text-sm text-green-600">kWh</div>
        </div>

        <div class="bg-card border rounded-xl p-6">
            <div class="text-sm text-muted-foreground mb-1">Total Earnings</div>
            <div class="text-3xl font-bold">3,420</div>
            <div class="text-sm text-green-600">RON</div>
        </div>

        <div class="bg-card border rounded-xl p-6">
            <div class="text-sm text-muted-foreground mb-1">CO₂ Offset</div>
            <div class="text-3xl font-bold">1,234</div>
            <div class="text-sm text-muted-foreground">kg (~59 trees)</div>
        </div>

        <div class="bg-card border rounded-xl p-6">
            <div class="text-sm text-muted-foreground mb-1">Active Days</div>
            <div class="text-3xl font-bold">127</div>
            <div class="text-sm text-muted-foreground">days</div>
        </div>
    </section>

    <section class="bg-card border rounded-xl p-6">
        <h2 class="text-xl font-bold mb-4">ESG Report Generator</h2>
        <p class="text-sm text-muted-foreground mb-4">
            Generate comprehensive sustainability reports for stakeholders
        </p>

        <div class="flex flex-col sm:flex-row gap-4 mb-6">
            <select class="px-4 py-2 rounded-lg border bg-background">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last year</option>
                <option>Custom range</option>
            </select>

            <button class="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
                <Download class="h-4 w-4" />
                Download PDF Report
            </button>
        </div>

        <div class="p-4 bg-accent rounded-lg">
            <h3 class="font-semibold mb-2">Report Preview</h3>
            <ul class="space-y-1 text-sm text-muted-foreground">
                <li>✓ Executive summary with key statistics</li>
                <li>✓ Energy provenance breakdown by source</li>
                <li>✓ Carbon footprint analysis</li>
                <li>✓ Blockchain verification hashes</li>
                <li>✓ Renewable energy certificates</li>
            </ul>
        </div>
    </section>

    <section class="bg-card border rounded-xl p-6">
        <h2 class="text-xl font-bold mb-4">Price Analytics</h2>
        <div class="h-64 rounded-lg">
            <canvas bind:this={chartCanvas}></canvas>
        </div>
    </section>
</div>