import type { RenderFunctionInput } from "astro-opengraph-images";
import React from "react";
const { twj } = await import("tw-to-css");

export function fnRender({
  title,
}: RenderFunctionInput): Promise<React.ReactNode> {
  return Promise.resolve(
    <div style={twj("flex flex-col w-full h-full bg-[#FCF8E8]")}>
      <div
        style={twj(
          "w-full flex justify-start text-[4.5rem] leading-[1] bg-[#222220] text-[#FCF8E8] p-[2.22rem_3.33rem]",
        )}
      >
        <span>nuexq</span>
      </div>
      <div
        style={twj(
          "flex text-[4rem] leading-[1.625] text-[#3D3C38] m-[2.22rem_3.33rem]",
        )}
      >
        <span>{title}</span>
      </div>
    </div>,
  );
}
