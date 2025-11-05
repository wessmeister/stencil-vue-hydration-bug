import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-text',
  shadow: true,
})
export class MyText {
  render() {
    return (
      <span>
        <slot />
      </span>
    );
  }
}
