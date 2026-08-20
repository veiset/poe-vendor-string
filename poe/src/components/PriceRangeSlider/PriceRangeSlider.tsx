import "./PriceRangeSlider.css";

interface PriceRangeSliderProps {
  id: string
  minValue: string
  maxValue: string
  onMinChange: (value: string) => void
  onMaxChange: (value: string) => void
  availablePrices: number[]
}

const validPrices = (prices: number[]) => prices.filter((price) => Number.isFinite(price) && price > 0);

const parsePrice = (value: string): number | undefined => {
  if (value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const PriceRangeSlider = ({
  id,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  availablePrices,
}: PriceRangeSliderProps) => {
  const prices = validPrices(availablePrices);
  if (prices.length === 0) {
    return <div className="price-range-slider-loading">Loading available price range…</div>;
  }

  const minimum = Math.floor(Math.min(...prices));
  const maximum = Math.ceil(Math.max(...prices));
  const range = maximum - minimum;
  const clamp = (value: number) => Math.min(maximum, Math.max(minimum, value));
  const sliderMin = clamp(parsePrice(minValue) ?? minimum);
  const sliderMax = clamp(parsePrice(maxValue) ?? maximum);
  const lowerValue = Math.min(sliderMin, sliderMax);
  const upperValue = Math.max(sliderMin, sliderMax);
  const lowerPosition = range === 0 ? 0 : ((lowerValue - minimum) / range) * 100;
  const upperPosition = range === 0 ? 100 : ((upperValue - minimum) / range) * 100;

  return (
    <section className="price-range-slider" aria-label="Chaos value range">
      <div className="price-range-slider-values">
        <div className="price-range-slider-value">
          <input
            id={`${id}-min`}
            aria-label="Minimum chaos value"
            type="text"
            inputMode="decimal"
            value={minValue}
            onChange={(event) => onMinChange(event.target.value)}
          />
          <span>chaos</span>
        </div>
        <div className="price-range-slider-value">
          <input
            id={`${id}-max`}
            aria-label="Maximum chaos value"
            type="text"
            inputMode="decimal"
            value={maxValue}
            onChange={(event) => onMaxChange(event.target.value)}
          />
          <span>chaos</span>
        </div>
      </div>
      <div className="price-range-slider-track-wrap">
        <div className="price-range-slider-track"/>
        <div
          className="price-range-slider-selection"
          style={{left: `${lowerPosition}%`, width: `${upperPosition - lowerPosition}%`}}
        />
        <input
          aria-label="Minimum chaos value slider"
          className="price-range-slider-thumb"
          type="range"
          min={minimum}
          max={maximum}
          step="1"
          value={lowerValue}
          onChange={(event) => onMinChange(String(Math.min(Number(event.target.value), upperValue)))}
        />
        <input
          aria-label="Maximum chaos value slider"
          className="price-range-slider-thumb"
          type="range"
          min={minimum}
          max={maximum}
          step="1"
          value={upperValue}
          onChange={(event) => onMaxChange(String(Math.max(Number(event.target.value), lowerValue)))}
        />
      </div>
    </section>
  );
};

export default PriceRangeSlider;
