import BannerCommon from '@/components/common/BannerCommon';
import ConfirmOrderContent from '@/components/contents/ConfirmOrderContent';
import React from 'react'

export default function ConfirmOrder() {
  return (
    <div>
      <BannerCommon title="Confirmation Your Order" />
      <ConfirmOrderContent />
    </div>
  );
}
