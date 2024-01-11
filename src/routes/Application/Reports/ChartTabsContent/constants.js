export const CHART_TAB_VALUE = {
  VOLUME: 'VOLUME',
  PERFORMANCE: 'PERFORMANCE',
  VARIANTS: 'VARIANTS COMPARISON',
  PRODUCT_PERFORMANCE: 'PRODUCT PERFORMANCE',
  PRODUCT_VOLUME: 'PRODUCT VOLUME',
  FINANCE: 'FINANCE',
  SCREEN_VOLUME: 'SCREEN VOLUME',
  SCREEN_PERFORMANCE: 'SCREEN PERFORMANCE',
  ECPM: 'ECPM',
};

export const volumeLines = [{
  name: 'Sent',
  dataKey: 'push_send_count',
  color: '#4675C0',
}, {
  name: 'Delivered',
  dataKey: 'push_delivered_count',
  color: '#FF9840',
}, {
  name: 'Opened',
  dataKey: 'push_open_count',
  color: '#22BB9F',
}];

export const performanceLines = [{
  name: 'Delivery rate',
  dataKey: 'delivery_rate',
  color: '#DC3D88',
}, {
  name: 'Open per sent',
  dataKey: 'open_per_sent',
  color: '#813AD8',
}, {
  name: 'Open per delivered',
  dataKey: 'open_per_delivered',
  color: '#22BB9F',
}];

export const variantColors = [
  '#4675C0', '#22BB9F', '#FF9840', '#DC3D88', '#813AD8',
];
