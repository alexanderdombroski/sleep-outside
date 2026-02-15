export function useInlineEdit<T extends Record<string, any>>(
  initial: T,
  onSave: (value: T) => Promise<void> | void,
) {
  // we need to keep track of the original value so we can revert if needed
  // we also need to take the initial value and make a draft copy that we can edit...that is reactive.
  const draft = initial;
  let original = initial;

  // we can create a derived value that tells us if the draft has changes compared to the original. Why is this in a function? If we did it like this:
  // const isDirty = $derived(SON.stringify(draft) !== JSON.stringify(original)) without the function then the value would be set once, when the component is created, and would never update. By using a function we ensure that it is re-evaluated whenever draft or original changes.
  // note that draft and original need to be reactive for this to work. That way if either of them changes the derived value will be re-evaluated.
  const isDirty = $derived(
    () => JSON.stringify(draft) !== JSON.stringify(original),
  );

  /** update the original value to match the draft */
  async function save() {
    onSave(draft)
    Object.assign(original, draft);
  }

  /** revert the draft to the original value */
  function cancel() {
    Object.assign(draft, original);
  }

  /** reset both the draft and original to the new value */
  function reset(newValue: T) {
    Object.assign(draft, newValue)
    Object.assign(original, newValue)
  }

  // we create a closure here that returns the draft, isDirty, save, cancel, and reset functions. This way we can use this functionality in any component that needs inline editing.
  return {
    draft,
    isDirty,
    save,
    cancel,
    reset,
  };
}
