import React, { Fragment, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
  MenuItem,
} from '@material-tailwind/react';
import Image from 'next/image';
import { PokemonType } from '@/types/Pokemon';

type Props = {
  open: boolean;
  handleOpen: () => void;
  pokemonData: any;
};

const Modal = (props: Props) => {
  return (
    <Fragment>
      <Dialog size="md" open={props.open} handler={props.handleOpen}>
        <DialogHeader className="justify-between">
          <div color="blue-gray" className="flex items-center justify-start gap-x-[10px]">
            <div className="overflow-hidden">
              <Image src={props?.pokemonData?.image} width={50} height={50} alt={props?.pokemonData?.name} />
            </div>
            <span>{props?.pokemonData?.name}</span>
          </div>
        </DialogHeader>
        <DialogBody className="overflow-y-scroll pr-2 max-h-[500px]">
          <div className="mb-6 overflow-y-scroll space-y-[10px]">
            <div color="gray" className="font-semibold opacity-70">
              Evolutions
            </div>
            <div className='space-y-[20px]'>
              {props?.pokemonData?.evolutions.map((ev: PokemonType, key: number) => (
                <div key={key}>
                  <div className="flex items-start justify-start gap-[20px]">
                    <Image src={ev?.image} width={50} height={50} alt="" />
                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex items-start justify-start gap-x-[10px]">
                        <p className="text-[12px] font-[600] w-[100px]">Name</p>
                        <p className="text-[12px] font-[400]">- {ev.name}</p>
                      </div>
                      <div className="flex items-start justify-start gap-x-[10px]">
                        <p className="text-[12px] font-[600] w-[100px]">Classification</p>
                        <p className="text-[12px] font-[400]">- {ev.classification}</p>
                      </div>
                      <div className="flex items-start justify-start gap-x-[10px]">
                        <p className="text-[12px] font-[600] w-[100px]">Types</p>
                        <div>
                          {ev?.types?.map((type, i) => (
                            <div key={i}>
                              <p className="text-[12px] font-[400]">- {type}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-start justify-start gap-x-[10px]">
                        <p className="text-[12px] font-[600] w-[100px]">Attacks</p>
                        <div className="grid grid-cols-12 w-[calc(100%-110px)]">
                          <div className="col-span-6">
                            <p className="text-[12px] font-[600]">Fast</p>
                            <div className="space-y-[10px]">
                              {ev?.attacks?.fast?.map((f, i) => (
                                <div key={i}>
                                  <p className="text-[12px] font-[400]">Name - {f.name}</p>
                                  <p className="text-[12px] font-[400]">Type - {f.type}</p>
                                  <p className="text-[12px] font-[400]">Damage - {f.damage}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="col-span-6">
                            <p className="text-[12px] font-[600]">Special</p>
                            <div className="space-y-[10px]">
                              {ev?.attacks?.special?.map((s, i) => (
                                <div key={i}>
                                  <p className="text-[12px] font-[400]">Name - {s.name}</p>
                                  <p className="text-[12px] font-[400]">Type - {s.type}</p>
                                  <p className="text-[12px] font-[400]">Damage - {s.damage}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Name Classification Types Attacks */}
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </Fragment>
  );
};

export default Modal;
