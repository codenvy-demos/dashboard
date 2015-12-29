/*
 * Copyright (c) 2015 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';

import Register from '../../utils/register';

/**
 * Defines a directive for a scrolled to bottom list event.
 * @author Michail Kuznyetsov
 */
class CodenvyListOnScrollBottom {
  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict='A';
  }

  /**
   * Check if scroll has reached the bottom
   */
  link(scope, element, attrs) {
    var raw = element[0];
    element.bind('scroll', function () {
      if (raw.scrollTop + raw.offsetHeight === raw.scrollHeight) {
        scope.$apply(attrs.cdvyListOnScrollBottom);
      }
    });
  }
}
export default CodenvyListOnScrollBottom;

Register.getInstance().directive('cdvyListOnScrollBottom', CodenvyListOnScrollBottom);