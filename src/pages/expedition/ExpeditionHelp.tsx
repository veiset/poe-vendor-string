import Collapsable from "../../components/collapsable/Collapsable";
import {PricedItemWithFallback} from "./ExpeditionTypes";
import {baseTypeRegex} from "../../generated/GeneratedExpedition";
import {ItemDisplay} from "./ExpeditionRow";

export const ExpeditionHelp = () => {
    const bases = Object.keys(baseTypeRegex);
    const sampleItemFallback: PricedItemWithFallback = {
        item: baseTypeRegex[bases[0]].items[0],
        fallbackPrice: 10,
        price: undefined,
        displayPrice: 10
    }
    const expensiveItem: PricedItemWithFallback = {
        item: baseTypeRegex[bases[1]].items[0],
        fallbackPrice: 3200,
        price: 3800,
        displayPrice: 3800
    }
    const regularItem: PricedItemWithFallback = {
        item: baseTypeRegex[bases[2]].items[0],
        fallbackPrice: 93,
        price: 120,
        displayPrice: 120
    }
    return (
        <Collapsable header={"Explanation / Help"}>
            <div className="expedition-help-heading">Examples of items</div>
            <div className="row small-padding">
                <ItemDisplay pricedItem={regularItem} />
                a regular item where the price is shown (in this case {regularItem.displayPrice} chaos)
            </div>
            <div className="row small-padding">
                <ItemDisplay pricedItem={expensiveItem} />
                an expensive item ({expensiveItem.displayPrice} chaos is rounded up to 4000 and shown as 4k)
            </div>
            <div className="row small-padding">
                <ItemDisplay pricedItem={sampleItemFallback} />
                an item with no price data in the current league (the price will be marked with a question mark '{sampleItemFallback.displayPrice}?')
            </div>

            <div className="expedition-help-heading">Minimum chaos value</div>
            <div>
                Items hidden by the minimum chaos value filter will STILL be matched by the regex.
                This option is meant to reduce visual clutter on the webpage.
                You can still search for items hidden by the filter and add them and they will be added to the regex.
            </div>


            <div className="expedition-help-heading">When is the data updated?</div>
            <div>Items data for each league is fetched from poe.ninja every 4 hours and is automatically updated.</div>

            <div className="expedition-help-heading">Real time data</div>
            <div>
                After deploying a new version of the page there will be a small delay before the economy files are fetched.
                During that time you will get a warning about no real time data and all items will be using the fallback economy files,
                you can still use the page but the economy data is out of date.
                This will typically only last for 5-10 minutes after a new deploy of the webpage.
            </div>

        </Collapsable>
    )
}