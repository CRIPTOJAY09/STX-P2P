import React from 'react';
import { HelpCircle, MessageCircle, FileText } from 'lucide-react';

export default function HelpSupport() {
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-medium mb-6">Help & Support</h2>

      <div className="space-y-4">
        <a
          href="#faq"
          className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 
                   transition-colors"
        >
          <HelpCircle className="w-5 h-5 text-[#05fabd]" />
          <div>
            <p className="font-medium">FAQ</p>
            <p className="text-sm text-gray-400">Frequently asked questions</p>
          </div>
        </a>

        <a
          href="#support"
          className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 
                   transition-colors"
        >
          <MessageCircle className="w-5 h-5 text-[#05fabd]" />
          <div>
            <p className="font-medium">Contact Support</p>
            <p className="text-sm text-gray-400">Get help from our team</p>
          </div>
        </a>

        <a
          href="#docs"
          className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 
                   transition-colors"
        >
          <FileText className="w-5 h-5 text-[#05fabd]" />
          <div>
            <p className="font-medium">Documentation</p>
            <p className="text-sm text-gray-400">Learn how to use the platform</p>
          </div>
        </a>
      </div>
    </div>
  );
}