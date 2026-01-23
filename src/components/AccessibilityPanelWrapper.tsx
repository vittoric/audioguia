import { Component, ReactNode } from 'react';
import { AccessibilityPanel } from './AccessibilityPanel';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class AccessibilityPanelWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Actualiza el estado para que la próxima renderización muestre la UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Puedes registrar el error en un servicio de reporte de errores aquí
    console.warn('AccessibilityPanel error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier UI de fallback personalizada
      console.warn('AccessibilityPanelWrapper: hasError is true');
      return null; // No renderizar nada si hay error
    }

    console.log('AccessibilityPanelWrapper: rendering AccessibilityPanel'); // Debug temporal
    return <AccessibilityPanel />;
  }
}
