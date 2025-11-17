"use client";

/**
 * Tanglewood Art Gallery - Filter Controls
 * Category, availability, and other filters with URL param sync
 */

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";

type Category = "all" | "landscape" | "portrait" | "abstract" | "still-life" | "seascape";
type Availability = "all" | "originals" | "prints" | "available" | "sold";

interface FilterState {
  category: Category;
  availability: Availability;
}

const categories = [
  { value: "all" as const, label: "All Categories" },
  { value: "landscape" as const, label: "Landscape" },
  { value: "portrait" as const, label: "Portrait" },
  { value: "abstract" as const, label: "Abstract" },
  { value: "still-life" as const, label: "Still Life" },
  { value: "seascape" as const, label: "Seascape" },
];

const availabilityOptions = [
  { value: "all" as const, label: "All Works" },
  { value: "available" as const, label: "Available" },
  { value: "sold" as const, label: "Sold" },
  { value: "originals" as const, label: "Originals Only" },
  { value: "prints" as const, label: "Prints Available" },
];

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    availability: "all",
  });

  // Initialize filters from URL params
  useEffect(() => {
    const category = (searchParams.get("category") as Category) || "all";
    const availability = (searchParams.get("availability") as Availability) || "all";
    setFilters({ category, availability });
  }, [searchParams]);

  // Update URL params when filters change
  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);

    // Build URL params
    const params = new URLSearchParams();
    if (updated.category !== "all") {
      params.set("category", updated.category);
    }
    if (updated.availability !== "all") {
      params.set("availability", updated.availability);
    }

    // Update URL without page reload
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(newUrl, { scroll: false });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({ category: "all", availability: "all" });
    router.push(pathname, { scroll: false });
  };

  // Check if any filters are active
  const hasActiveFilters = filters.category !== "all" || filters.availability !== "all";

  return (
    <div className="mb-8">
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-museum-slate bg-museum-charcoal text-museum-cream hover:border-museum-gold transition-colors w-full justify-center"
          aria-expanded={isOpen}
          aria-controls="filter-panel"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-museum-gold text-museum-dark font-semibold">
              Active
            </span>
          )}
        </button>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {(isOpen || typeof window !== "undefined" && window.innerWidth >= 1024) && (
          <motion.div
            id="filter-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="rounded-lg border border-museum-slate bg-museum-charcoal p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Category filter */}
                <div className="flex-1">
                  <label
                    htmlFor="category-filter"
                    className="label text-xs mb-3"
                  >
                    Category
                  </label>
                  <div
                    id="category-filter"
                    role="group"
                    aria-label="Filter by category"
                    className="flex flex-wrap gap-2"
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => updateFilters({ category: cat.value })}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          filters.category === cat.value
                            ? "bg-museum-gold text-museum-dark shadow-gold-glow"
                            : "bg-museum-dark text-museum-cream border border-museum-slate hover:border-museum-gold"
                        }`}
                        aria-pressed={filters.category === cat.value}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability filter */}
                <div className="flex-1">
                  <label
                    htmlFor="availability-filter"
                    className="label text-xs mb-3"
                  >
                    Availability
                  </label>
                  <div
                    id="availability-filter"
                    role="group"
                    aria-label="Filter by availability"
                    className="flex flex-wrap gap-2"
                  >
                    {availabilityOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          updateFilters({ availability: option.value })
                        }
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          filters.availability === option.value
                            ? "bg-museum-gold text-museum-dark shadow-gold-glow"
                            : "bg-museum-dark text-museum-cream border border-museum-slate hover:border-museum-gold"
                        }`}
                        aria-pressed={filters.availability === option.value}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear filters button */}
                {hasActiveFilters && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="lg:self-end"
                  >
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-museum-cream border border-museum-slate hover:border-museum-gold hover:text-museum-gold transition-colors"
                      aria-label="Clear all filters"
                    >
                      <X className="w-4 h-4" />
                      Clear Filters
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active filter tags (visible on mobile when panel is closed) */}
      {hasActiveFilters && !isOpen && (
        <div className="lg:hidden flex flex-wrap gap-2 mb-4">
          {filters.category !== "all" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-museum-gold text-museum-dark text-sm font-medium"
            >
              <span>
                {categories.find((c) => c.value === filters.category)?.label}
              </span>
              <button
                onClick={() => updateFilters({ category: "all" })}
                className="p-0.5 hover:bg-museum-dark/20 rounded-full transition-colors"
                aria-label={`Remove ${filters.category} filter`}
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
          {filters.availability !== "all" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-museum-gold text-museum-dark text-sm font-medium"
            >
              <span>
                {
                  availabilityOptions.find(
                    (a) => a.value === filters.availability
                  )?.label
                }
              </span>
              <button
                onClick={() => updateFilters({ availability: "all" })}
                className="p-0.5 hover:bg-museum-dark/20 rounded-full transition-colors"
                aria-label={`Remove ${filters.availability} filter`}
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
