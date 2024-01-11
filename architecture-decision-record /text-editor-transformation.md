## Decision record template by Yury.S.

### Change text editor mode from inline to textField mode.
May, 2023

### Status
accepted, implemented.

### Context

We should implement Offers Feature.

### Decision

We should implement Offers Feature, it gives as ability to select offers under the products,
this idea imply that we can have multiple versions of the same widget(f.e. <em>text</em>). Because our current widgets have
lots of controls <em>(color, fontSize, fontWeight, lineHeight...)</em> it take lots of space and make difficult to store it. Our new approach
allows us to store all configurations <em>(color, fontSize, fontWeight, lineHeight...)</em> in Editor html as inline styles, and in the same time we will store all the configuration controls
in editor panel, it will take less space.

## Consequences

It doesn't influence our old campaigns. But we should remove old controls for widget configurations.