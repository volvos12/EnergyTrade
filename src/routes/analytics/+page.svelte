<script lang="ts">
    import { BarChart3, TrendingUp, Download } from 'lucide-svelte';
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
        <div class="h-64 flex items-center justify-center bg-accent rounded-lg">
            <div class="text-center text-muted-foreground">
                <BarChart3 class="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Price chart visualization would appear here</p>
                <p class="text-sm">(Chart.js or Recharts integration)</p>
            </div>
        </div>
    </section>
</div>
