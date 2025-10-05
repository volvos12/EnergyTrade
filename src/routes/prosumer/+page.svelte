<script lang="ts">
    import { userStore } from '$lib/stores/mockdata';
    import { Zap,DollarSign, Battery, Sun } from 'lucide-svelte';

    let user = $userStore;
    userStore.subscribe(value => user = value);

    let currentProduction = 4.2;
    let todayProduction = 28.5;
    let surplusAvailable = 15.3;
    let monthlyEarnings = 847.20;

    let listingQuantity = $state(10);
    let listingPrice = $state(0.45);
    let autoSell = $state(false);

    const suggestedPrice = 0.45;
    const marketAvg = 0.43;
    const gridBuyback = 0.25;

    function publishListing() {
        alert(`Listing published!\n\n${listingQuantity} kWh @ ${listingPrice} RON/kWh\n\nYour energy is now available on the marketplace.`);
    }
</script>

<div class="container mx-auto px-4 py-8 space-y-8">
    <div>
        <h1 class="text-3xl font-bold mb-2">My Prosumer Panel</h1>
        <p class="text-muted-foreground">Manage your energy production and sales</p>
    </div>

    <!-- Production Dashboard -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-card border rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-muted-foreground">Current Production</span>
                <Sun class="h-5 w-5 text-yellow-500" />
            </div>
            <div class="text-3xl font-bold">{currentProduction}</div>
            <div class="text-sm text-muted-foreground">kW</div>
            <div class="mt-2 h-2 bg-accent rounded-full overflow-hidden">
                <div class="h-full bg-yellow-500" style={`width: ${(currentProduction / 5) * 100}%`}></div>
            </div>
        </div>

        <div class="bg-card border rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-muted-foreground">Today's Production</span>
                <Zap class="h-5 w-5 text-green-500" />
            </div>
            <div class="text-3xl font-bold">{todayProduction}</div>
            <div class="text-sm text-green-600">+12% vs yesterday</div>
        </div>

        <div class="bg-card border rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-muted-foreground">Surplus Available</span>
                <Battery class="h-5 w-5 text-blue-500" />
            </div>
            <div class="text-3xl font-bold">{surplusAvailable}</div>
            <div class="text-sm text-muted-foreground">kWh to sell</div>
        </div>

        <div class="bg-card border rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-muted-foreground">Monthly Earnings</span>
                <DollarSign class="h-5 w-5 text-emerald-500" />
            </div>
            <div class="text-3xl font-bold">{monthlyEarnings.toFixed(2)}</div>
            <div class="text-sm text-green-600">+8.5% vs last month</div>
        </div>
    </section>

    <!-- Weather & Production Forecast -->
    <section class="bg-card border rounded-xl p-6">
        <h2 class="text-xl font-bold mb-4">Weather & Production Forecast</h2>
        <div class="flex items-center gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <Sun class="h-12 w-12 text-yellow-500" />
            <div class="flex-1">
                <div class="text-2xl font-bold">☀️ Great weather!</div>
                <p class="text-muted-foreground">Expecting +30% production today. Solar irradiance: 850 W/m²</p>
            </div>
            <div class="text-right">
                <div class="text-3xl font-bold">24°C</div>
                <div class="text-sm text-muted-foreground">București</div>
            </div>
        </div>
    </section>

    <!-- Create Listing -->
    <section class="bg-card border rounded-xl p-6">
        <h2 class="text-xl font-bold mb-4">Create New Listing</h2>

        <div class="space-y-6">
            <div>
                <label class="block text-sm font-medium mb-2" for="quantity">Quantity to Sell (kWh)</label>
                <div class="flex gap-2">
                    <input
                            type="number"
                            bind:value={listingQuantity}
                            min="1"
                            max={surplusAvailable}
                            class="flex-1 px-4 py-2 rounded-lg border bg-background"
                            id="quantity"
                    />
                    <button
                            onclick={() => listingQuantity = surplusAvailable}
                            class="px-4 py-2 rounded-lg border hover:bg-accent"
                            aria-label="Sell All Surplus"
                    >
                        Sell All Surplus
                    </button>
                </div>
                <div class="text-sm text-muted-foreground mt-1">
                    Available: {surplusAvailable} kWh
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium mb-2" for="price">Price per kWh (RON)</label>
                <input
                        type="number"
                        bind:value={listingPrice}
                        step="0.01"
                        min="0.25"
                        max="0.70"
                        class="w-full px-4 py-2 rounded-lg border bg-background"
                        id="price"
                />
                <div class="mt-2 p-3 bg-accent rounded-lg space-y-1 text-sm">
                    <div class="flex justify-between">
                        <span class="text-muted-foreground">Grid buyback:</span>
                        <span>{gridBuyback} RON</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-muted-foreground">Market average:</span>
                        <span>{marketAvg} RON</span>
                    </div>
                    <div class="flex justify-between font-semibold">
                        <span class="text-green-600">AI suggested:</span>
                        <span class="text-green-600">{suggestedPrice} RON</span>
                    </div>
                </div>
                <button
                        onclick={() => listingPrice = suggestedPrice}
                        class="mt-2 text-sm text-green-600 hover:underline"
                        aria-label="Use AI suggested price"
                >
                    Use AI suggested price
                </button>
            </div>

            <div class="flex items-center gap-2">
                <input
                        type="checkbox"
                        id="auto-sell"
                        bind:checked={autoSell}
                        class="h-4 w-4 rounded border-gray-300"
                />
                <label for="auto-sell" class="text-sm">
                    Auto-renewal: Relist daily at this price
                </label>
            </div>

            <div class="border-t pt-4">
                <div class="flex justify-between mb-2">
                    <span class="text-muted-foreground">You will earn:</span>
                    <span class="text-2xl font-bold text-green-600">
            {(listingQuantity * listingPrice).toFixed(2)} RON
          </span>
                </div>
                <button
                        onclick={publishListing}
                        class="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        aria-label="Publish Listing"
                >
                    Publish Listing
                </button>
            </div>
        </div>
    </section>

    <!-- Sales Analytics -->
    <section class="bg-card border rounded-xl p-6">
        <h2 class="text-xl font-bold mb-4">Sales Analytics</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 bg-accent rounded-lg">
                <div class="text-sm text-muted-foreground mb-1">Total Sales (30 days)</div>
                <div class="text-2xl font-bold">342 kWh</div>
                <div class="text-sm text-green-600">+15% vs last month</div>
            </div>
            <div class="p-4 bg-accent rounded-lg">
                <div class="text-sm text-muted-foreground mb-1">Average Price</div>
                <div class="text-2xl font-bold">0.44 RON</div>
                <div class="text-sm text-green-600">+2% vs market</div>
            </div>
            <div class="p-4 bg-accent rounded-lg">
                <div class="text-sm text-muted-foreground mb-1">Total Buyers</div>
                <div class="text-2xl font-bold">28</div>
                <div class="text-sm text-muted-foreground">Unique customers</div>
            </div>
        </div>
    </section>

    <!-- AI Energy Butler -->
    <section class="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
        <div class="flex items-start justify-between mb-4">
            <div>
                <h2 class="text-xl font-bold mb-1">AI Energy Butler</h2>
                <p class="text-sm text-muted-foreground">Let AI automatically sell your surplus at optimal prices</p>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-sm text-muted-foreground">Autopilot</span>
                <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700" aria-label="Toggle Autopilot">
                    <span class="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
                </button>
            </div>
        </div>
        <div class="p-4 bg-background/50 rounded-lg">
            <div class="text-sm text-muted-foreground">Status: Inactive</div>
            <p class="text-sm mt-2">Enable autopilot to let AI handle your sales automatically based on market conditions.</p>
        </div>
    </section>
</div>
