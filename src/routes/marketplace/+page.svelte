<script lang="ts">
    import { prosumers, filters } from '$lib/stores/mockdata';
    import { Search, Filter, Grid, List, MapPin, Zap, Star, ShoppingCart } from 'lucide-svelte';

    let searchQuery = $state('');
    let viewMode = $state<'grid' | 'list'>('grid');
    let showFilters = $state(false);

    type Prosumer = typeof prosumers[0];
    let selectedProsumer = $state<Prosumer | null>(null);
    let buyQuantity = $state(10);

    let currentFilters = $state({
        energyTypes: [] as string[],
        priceRange: [0.25, 0.70] as [number, number],
        locations: [] as string[],
        minReputation: 0,
        sortBy: 'price-low'
    });

    filters.subscribe(value => currentFilters = value);

    const energyTypes = ['Solar', 'Wind', 'Hydro', 'Mixed'];
    const sortOptions = [
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'reputation', label: 'Highest Rated' },
        { value: 'distance', label: 'Nearest First' },
    ];

    let filteredProsumers = $state<Prosumer[]>([]);

    $effect.pre(() => {
        let result = [...prosumers];

        // Search filter
        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Energy type filter
        if (currentFilters.energyTypes.length > 0) {
            result = result.filter(p => currentFilters.energyTypes.includes(p.energyType));
        }

        // Price range filter
        result = result.filter(p =>
            p.pricePerKwh >= currentFilters.priceRange[0] &&
            p.pricePerKwh <= currentFilters.priceRange[1]
        );

        // Reputation filter
        if (currentFilters.minReputation > 0) {
            result = result.filter(p => p.reputation >= currentFilters.minReputation);
        }

        // Sorting
        switch (currentFilters.sortBy) {
            case 'price-low':
                result.sort((a, b) => a.pricePerKwh - b.pricePerKwh);
                break;
            case 'price-high':
                result.sort((a, b) => b.pricePerKwh - a.pricePerKwh);
                break;
            case 'reputation':
                result.sort((a, b) => b.reputation - a.reputation);
                break;
            case 'distance':
                result.sort((a, b) => a.distance - b.distance);
                break;
        }

        filteredProsumers = result;
    });

    function toggleEnergyType(type: string) {
        filters.update(f => ({
            ...f,
            energyTypes: f.energyTypes.includes(type)
                ? f.energyTypes.filter(t => t !== type)
                : [...f.energyTypes, type]
        }));
    }

    function openBuyModal(prosumer: Prosumer) {
        selectedProsumer = prosumer;
        buyQuantity = Math.min(10, prosumer.availableKwh);
    }

    function confirmPurchase() {
        if (!selectedProsumer) return;

        const total = (buyQuantity * selectedProsumer.pricePerKwh).toFixed(2);
        alert(`Purchase confirmed!\n\n${buyQuantity} kWh from ${selectedProsumer.name}\nTotal: ${total} RON\n\nTransaction hash: 0x${Math.random().toString(16).slice(2, 18)}...`);
        selectedProsumer = null;
    }

    function handleModalKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            selectedProsumer = null;
        }
    }

    const gridPrice = 0.52; // Reference grid price
</script>

<div class="container mx-auto px-4 py-8">
    <div class="mb-6">
        <h1 class="text-3xl font-bold mb-2">Energy Marketplace</h1>
        <p class="text-muted-foreground">Buy renewable energy directly from local prosumers</p>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Search by name or location..."
                    class="w-full pl-10 pr-4 py-2 rounded-lg border bg-background"
            />
        </div>

        <button
                aria-label="Toggle Filters"
                onclick={() => showFilters = !showFilters}
                class="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-accent"
        >
            <Filter class="h-5 w-5" />
            {#if currentFilters.energyTypes.length > 0 || currentFilters.minReputation > 0}
                <span class="h-2 w-2 rounded-full bg-green-500"></span>
            {/if}
        </button>

        <div class="flex gap-2">
            <button
                    aria-label="Grid View"
                    onclick={() => viewMode = 'grid'}
                    class={`p-2 rounded-lg border ${viewMode === 'grid' ? 'bg-accent' : ''}`}
            >
                <Grid class="h-5 w-5" />
            </button>
            <button
                    aria-label="List View"
                    onclick={() => viewMode = 'list'}
                    class={`p-2 rounded-lg border ${viewMode === 'list' ? 'bg-accent' : ''}`}
            >
                <List class="h-5 w-5" />
            </button>
        </div>
    </div>

    {#if showFilters}
        <div class="bg-card border rounded-xl p-6 mb-6 space-y-6">
            <div>
                <h3 class="font-semibold mb-3">Energy Type</h3>
                <div class="flex flex-wrap gap-2">
                    {#each energyTypes as type}
                        <button
                                aria-label={`Toggle ${type} Energy Type`}
                                onclick={() => toggleEnergyType(type)}
                                class={`
                px-4 py-2 rounded-full border transition-colors
                ${currentFilters.energyTypes.includes(type)
                  ? 'bg-gray-500 text-white border-green-500'
                  : 'hover:bg-accent'}
              `}
                        >
                            {type}
                        </button>
                    {/each}
                </div>
            </div>

            <div>
                <h3 class="font-semibold mb-3">Price Range (RON/kWh)</h3>
                <div class="flex items-center gap-4">
                    <input
                            type="range"
                            min="0.25"
                            max="0.70"
                            step="0.01"
                            value={currentFilters.priceRange[0]}
                            oninput={(e) => {
                                const target:HTMLInputElement = e.currentTarget ;
                                filters.update(f => ({ ...f, priceRange: [+target.value, f.priceRange[1]] }));
                            }}
                            class="flex-1"
                    />
                    <span class="text-sm font-mono w-16">{currentFilters.priceRange[0].toFixed(2)}</span>
                    <span class="text-muted-foreground">-</span>
                    <input
                            type="range"
                            min="0.25"
                            max="0.70"
                            step="0.01"
                            value={currentFilters.priceRange[1]}
                            oninput={(e) => {
                                const target:HTMLInputElement = e.currentTarget;
                                filters.update(f => ({ ...f, priceRange: [f.priceRange[0], +target.value] }));
                            }}
                            class="flex-1"
                    />
                    <span class="text-sm font-mono w-16">{currentFilters.priceRange[1].toFixed(2)}</span>
                </div>
            </div>

            <div>
                <h3 class="font-semibold mb-3">Minimum Reputation</h3>
                <div class="flex items-center gap-4">
                    <input
                            type="range"
                            min="0"
                            max="5"
                            step="0.5"
                            value={currentFilters.minReputation}
                            oninput={(e) => {
                                const target:HTMLInputElement = e.currentTarget;
                                filters.update(f => ({ ...f, minReputation: +target.value }));
                            }}
                            class="flex-1"
                    />
                    <span class="text-sm font-mono w-12">{currentFilters.minReputation.toFixed(1)} ★</span>
                </div>
            </div>

            <div>
                <h3 class="font-semibold mb-3">Sort By</h3>
                <select
                        value={currentFilters.sortBy}
                        onchange={(e) => {
                            const target:HTMLSelectElement = e.currentTarget;
                            filters.update(f => ({ ...f, sortBy: target.value }));
                        }}
                        class="w-full px-4 py-2 rounded-lg border bg-background"
                >
                    {#each sortOptions as option}
                        <option value={option.value}>{option.label}</option>
                    {/each}
                </select>
            </div>
        </div>
    {/if}

    <div class="mb-4 text-sm text-muted-foreground">
        Showing {filteredProsumers.length} of {prosumers.length} prosumers
    </div>

    <div class={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {#each filteredProsumers as prosumer}
            <div class={`
        bg-card border rounded-xl p-6 hover:shadow-lg transition-all
        ${viewMode === 'list' ? 'flex gap-6' : ''}
      `}>
                <div class={viewMode === 'list' ? 'flex-1' : ''}>
                    <div class="flex items-start gap-3 mb-4">
                        <img src={prosumer.avatar || "/placeholder.svg"} alt={prosumer.name} class="h-12 w-12 rounded-full" />
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2">
                                <h3 class="font-semibold truncate">{prosumer.name}</h3>
                                {#if prosumer.verified}
                                    <span class="text-green-500" title="Verified">✓</span>
                                {/if}
                            </div>
                            <div class="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin class="h-3 w-3" />
                                {prosumer.location}
                            </div>
                        </div>
                    </div>

                    <div class={`
            inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium mb-4
            ${prosumer.energyType === 'Solar' ? ' text-yellow-700 dark:bg-gray-100 dark:text-yellow-400' : ''}
            ${prosumer.energyType === 'Wind' ? ' text-blue-700 dark:bg-gray-100 dark:text-blue-400' : ''}
            ${prosumer.energyType === 'Hydro' ? ' text-cyan-700 dark:bg-gray-100 dark:text-cyan-400' : ''}
            ${prosumer.energyType === 'Mixed' ? 'text-green-700 dark:bg-gray-100 dark:text-green-400' : ''}
          `}>
                        <Zap class="h-4 w-4" />
                        {prosumer.energyType}
                    </div>

                    <div class="space-y-3 mb-4">
                        <div>
                            <div class="text-3xl font-bold text-green-600">{prosumer.availableKwh}</div>
                            <div class="text-sm text-muted-foreground">kWh available</div>
                        </div>

                        <div class="flex items-baseline gap-2">
                            <div class="text-2xl font-bold">{prosumer.pricePerKwh}</div>
                            <div class="text-sm text-muted-foreground">RON/kWh</div>
                            <div class="text-sm text-green-600 font-medium">
                                {Math.round((1 - prosumer.pricePerKwh / gridPrice) * 100)}% cheaper!
                            </div>
                        </div>

                        <div class="flex items-center justify-between text-sm">
                            <div class="flex items-center gap-1">
                                <Star class="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                <span class="font-semibold">{prosumer.reputation}</span>
                                <span class="text-muted-foreground">({prosumer.totalSales} sales)</span>
                            </div>
                            <div class="text-muted-foreground">{prosumer.distance} km away</div>
                        </div>
                    </div>
                </div>

                <div class={`flex gap-2 ${viewMode === 'list' ? 'flex-col justify-center' : ''}`}>
                    <button
                            aria-label={`Buy Now from ${prosumer.name}`}
                            onclick={() => openBuyModal(prosumer)}
                            class="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                        <ShoppingCart class="h-4 w-4" />
                        Buy Now
                    </button>
                    <button
                            aria-label={`View Details of ${prosumer.name}`}
                            class="px-4 py-2 rounded-lg border hover:bg-accent transition-colors"
                    >
                        Details
                    </button>
                </div>
            </div>
        {/each}
    </div>

    {#if filteredProsumers.length === 0}
        <div class="text-center py-12">
            <div class="text-6xl mb-4">🔍</div>
            <h3 class="text-xl font-semibold mb-2">No prosumers found</h3>
            <p class="text-muted-foreground mb-4">Try adjusting your filters</p>
            <button
                    aria-label="Clear Filters"
                    onclick={() => filters.set({ energyTypes: [], priceRange: [0.25, 0.70], locations: [], minReputation: 0, sortBy: 'price-low' })}
                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
                Clear Filters
            </button>
        </div>
    {/if}
</div>

{#if selectedProsumer}
    <div
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            role="presentation"
            onclick={(e) => {
      if (e.target === e.currentTarget) {
        selectedProsumer = null;
      }
    }}
    >
        <div
                class="bg-background border rounded-xl p-6 max-w-md w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                tabindex="-1"
                onkeydown={handleModalKeydown}
        >
            <h2 id="modal-title" class="text-2xl font-bold mb-4">Quick Buy</h2>

            <div class="space-y-4 mb-6">
                <div class="flex items-center gap-3 p-3 bg-accent rounded-lg">
                    <img src={selectedProsumer.avatar || "/placeholder.svg"} alt={selectedProsumer.name} class="h-10 w-10 rounded-full" />
                    <div>
                        <div class="font-semibold">{selectedProsumer.name}</div>
                        <div class="text-sm text-muted-foreground">{selectedProsumer.location}</div>
                    </div>
                </div>

                <div>
                    <label for="quantity" class="block text-sm font-medium mb-2">
                        Quantity (kWh)
                    </label>
                    <input
                            id="quantity"
                            type="range"
                            min="1"
                            max={selectedProsumer.availableKwh}
                            bind:value={buyQuantity}
                            class="w-full"
                            aria-label="Quantity"
                    />
                    <div class="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>1</span>
                        <span class="font-semibold text-foreground">{buyQuantity} kWh</span>
                        <span>{selectedProsumer.availableKwh}</span>
                    </div>
                </div>

                <div class="border-t pt-4 space-y-2">
                    <div class="flex justify-between text-sm">
                        <span class="text-muted-foreground">Energy cost:</span>
                        <span>{(buyQuantity * selectedProsumer.pricePerKwh).toFixed(2)} RON</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-muted-foreground">Transport fee:</span>
                        <span>{(buyQuantity * 0.065).toFixed(2)} RON</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-muted-foreground">Distribution:</span>
                        <span>{(buyQuantity * 0.082).toFixed(2)} RON</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-muted-foreground">Platform fee:</span>
                        <span>{(buyQuantity * 0.015).toFixed(2)} RON</span>
                    </div>
                    <div class="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>Total:</span>
                        <span class="text-green-600">{(buyQuantity * (selectedProsumer.pricePerKwh + 0.162)).toFixed(2)} RON</span>
                    </div>
                </div>
            </div>

            <div class="flex gap-3">
                <button
                        aria-label="Cancel Purchase"
                        onclick={() => selectedProsumer = null}
                        class="flex-1 px-4 py-2 rounded-lg border hover:bg-accent"
                >
                    Cancel
                </button>
                <button
                        aria-label="Confirm Purchase"
                        onclick={confirmPurchase}
                        class="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
                >
                    Confirm Purchase
                </button>
            </div>
        </div>
    </div>
{/if}