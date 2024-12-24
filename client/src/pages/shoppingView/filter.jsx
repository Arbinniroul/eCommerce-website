import React, { Fragment } from "react";
import { filterOptions } from "@/config";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@radix-ui/react-label";
import { Separator } from "@/components/ui/separator"


function ProductFilter({filters ,handleFilter}) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem, index) => (
          <Fragment key={index}>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option,idx) => (
                  <Label key={idx} className="flex font-medium items-center gap-2 font-normal">
                   <Checkbox
  onCheckedChange={(checked) => handleFilter(keyItem, option.id, checked)}
/>


                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator/>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
