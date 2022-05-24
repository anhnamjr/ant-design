import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { AliasToken } from '../../_util/theme';
import { roundedArrow } from '../../_util/theme';
import type { TokenWithCommonCls } from '../../_util/theme/util/genComponentStyleHook';

function connectArrowCls(classList: string[], showArrowCls: string = '') {
  return classList.map(cls => `${showArrowCls}${cls}`).join(',');
}

export default function getArrowStyle<Token extends TokenWithCommonCls<AliasToken>>(
  token: Token,
  colorBg: string,
  showArrowCls?: string,
): CSSInterpolation {
  const { componentCls, sizePopupArrow, marginXXS } = token;

  const dropdownArrowOffset = (sizePopupArrow / Math.sqrt(2)) * 2;
  const dropdownArrowDistance = sizePopupArrow + marginXXS;

  return {
    [componentCls]: {
      // ============================ Basic ============================
      [`${componentCls}-arrow`]: {
        position: 'absolute',
        zIndex: 1, // lift it up so the menu wouldn't cask shadow on it
        display: 'block',
        width: sizePopupArrow,
        height: sizePopupArrow,
        // Use linear-gradient to prevent arrow from covering text
        background: `linear-gradient(135deg, transparent 40%, ${colorBg} 40%)`,

        ...roundedArrow(sizePopupArrow, 5, colorBg),
      },

      // ========================== Placement ==========================
      // Here handle the arrow position and rotate stuff
      // >>>>> Top
      [[
        `&-placement-top ${componentCls}-arrow`,
        `&-placement-topLeft ${componentCls}-arrow`,
        `&-placement-topRight ${componentCls}-arrow`,
      ].join(',')]: {
        bottom: 0,
        boxShadow: `3px 3px 7px -3px rgba(0, 0, 0, 0.1)`, // FIXME: hardcode
        transform: 'translateY(50%) rotate(45deg)',
      },

      [`&-placement-top ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: '50%',
        },
        transform: 'translateX(-50%) translateY(50%) rotate(45deg)',
      },

      [`&-placement-topLeft ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: dropdownArrowOffset,
        },
      },

      [`&-placement-topRight ${componentCls}-arrow`]: {
        right: {
          _skip_check_: true,
          value: dropdownArrowOffset,
        },
      },

      // >>>>> Bottom
      [[
        `&-placement-bottom ${componentCls}-arrow`,
        `&-placement-bottomLeft ${componentCls}-arrow`,
        `&-placement-bottomRight ${componentCls}-arrow`,
      ].join(',')]: {
        top: 0,
        boxShadow: `2px 2px 5px -2px rgba(0, 0, 0, 0.1)`, // FIXME: hardcode
        transform: `translateY(-50%) rotate(-135deg)`,
      },

      [`&-placement-bottom ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: '50%',
        },
        transform: `translateX(-50%) translateY(-50%) rotate(-135deg)`,
      },

      [`&-placement-bottomLeft ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: dropdownArrowOffset,
        },
      },

      [`&-placement-bottomRight ${componentCls}-arrow`]: {
        right: {
          _skip_check_: true,
          value: dropdownArrowOffset,
        },
      },

      // >>>>> Left
      [[
        `&-placement-left ${componentCls}-arrow`,
        `&-placement-leftTop ${componentCls}-arrow`,
        `&-placement-leftBottom ${componentCls}-arrow`,
      ].join(',')]: {
        right: {
          _skip_check_: true,
          value: 0,
        },
        boxShadow: `3px 3px 7px -3px rgba(0, 0, 0, 0.1)`, // FIXME: hardcode
        transform: 'translateX(50%) rotate(-45deg)',
      },

      [`&-placement-left ${componentCls}-arrow`]: {
        top: {
          _skip_check_: true,
          value: '50%',
        },
        transform: 'translateY(-50%) translateX(50%) rotate(-45deg)',
      },

      [`&-placement-leftTop ${componentCls}-arrow`]: {
        top: dropdownArrowOffset,
      },

      [`&-placement-leftBottom ${componentCls}-arrow`]: {
        bottom: dropdownArrowOffset,
      },

      // >>>>> Right
      [[
        `&-placement-right ${componentCls}-arrow`,
        `&-placement-rightTop ${componentCls}-arrow`,
        `&-placement-rightBottom ${componentCls}-arrow`,
      ].join(',')]: {
        left: {
          _skip_check_: true,
          value: 0,
        },
        boxShadow: `3px 3px 7px -3px rgba(0, 0, 0, 0.1)`, // FIXME: hardcode
        transform: 'translateX(-50%) rotate(135deg)',
      },

      [`&-placement-right ${componentCls}-arrow`]: {
        top: {
          _skip_check_: true,
          value: '50%',
        },
        transform: 'translateY(-50%) translateX(-50%) rotate(135deg)',
      },

      [`&-placement-rightTop ${componentCls}-arrow`]: {
        top: dropdownArrowOffset,
      },

      [`&-placement-rightBottom ${componentCls}-arrow`]: {
        bottom: dropdownArrowOffset,
      },

      // =========================== Offset ============================
      // Offset the popover to account for the dropdown arrow
      // >>>>> Top
      [connectArrowCls(
        [`&-placement-topLeft`, `&-placement-top`, `&-placement-topRight`],
        showArrowCls,
      )]: {
        paddingBottom: dropdownArrowDistance,
      },

      // >>>>> Bottom
      [connectArrowCls(
        [`&-placement-bottomLeft`, `&-placement-bottom`, `&-placement-bottomRight`],
        showArrowCls,
      )]: {
        paddingTop: dropdownArrowDistance,
      },

      // >>>>> Left
      [connectArrowCls(
        [`&-placement-leftTop`, `&-placement-left`, `&-placement-leftBottom`],
        showArrowCls,
      )]: {
        paddingRight: {
          _skip_check_: true,
          value: dropdownArrowDistance,
        },
      },

      // >>>>> Right
      [connectArrowCls(
        [`&-placement-rightTop`, `&-placement-right`, `&-placement-rightBottom`],
        showArrowCls,
      )]: {
        paddingLeft: {
          _skip_check_: true,
          value: dropdownArrowDistance,
        },
      },
    },
  };
}
