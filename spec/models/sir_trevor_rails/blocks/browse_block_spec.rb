require 'spec_helper'

describe SirTrevorRails::Blocks::BrowseBlock do
  let(:page) { FactoryGirl.create(:feature_page) }
  let(:block_data) { {} }
  subject { described_class.new({ type: '', data: block_data }, page) }

  describe '#items' do
    it 'is the array of items with display set to true' do
      block_data[:item] = {
        '0': { id: 'abc123', display: 'true' },
        '1': { id: 'xyz321', display: 'false' }
      }
      expect(subject.items.length).to eq 1
      expect(subject.items).to eq([{ id: 'abc123', display: 'true' }])
    end

    it 'is an empty array when there is no browse category' do
      expect(subject.items).to eq([])
    end
  end
end
