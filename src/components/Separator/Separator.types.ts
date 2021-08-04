import { ReactNode } from 'react';

export interface Props {
  /**
   * className custom class to be able to override  the separators's CSS
   */
  className?: string;
  /**
   * The child components of this component.
   */
  children?: ReactNode;
}
