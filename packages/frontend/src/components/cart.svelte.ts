import type { Color } from "../../../shared/types/schemas.mts";

export let selectedColor: { color?: Color } = $state({});
export let cartRefresh = $state({ data: 0 });

export function selectColor(color: Color) {
  selectedColor.color = color;
}
